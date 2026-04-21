#!/usr/bin/env bash
set -Eeuo pipefail

# =========================
# Config
# =========================
SERVER_HOST="5.78.109.141"
SERVER_USER="root"
REMOTE_BASE="/var/www/strapi-test"
REMOTE_APP="$REMOTE_BASE/app"
REMOTE_RELEASES="$REMOTE_BASE/releases"

# Опции:
# SKIP_BUILD=1   ./deploy-strapi.sh   -> пропустить npm run build
# SKIP_UPLOADS=1 ./deploy-strapi.sh   -> не обновлять uploads
# SKIP_DB=1      ./deploy-strapi.sh   -> не обновлять базу
#
# Примеры:
# ./deploy-strapi.sh
# SKIP_DB=1 ./deploy-strapi.sh
# SKIP_DB=1 SKIP_UPLOADS=1 ./deploy-strapi.sh
# SKIP_BUILD=1 SKIP_DB=1 ./deploy-strapi.sh

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
TMP_DIR=".deploy-tmp"
CODE_ARCHIVE="$TMP_DIR/strapi-code-$TIMESTAMP.tar.gz"
UPLOADS_ARCHIVE="$TMP_DIR/strapi-uploads-$TIMESTAMP.tar.gz"
DB_DUMP="$TMP_DIR/strapi-db-$TIMESTAMP.sql"

log() {
  echo
  echo "==> $1"
}

fail() {
  echo
  echo "ERROR: $1" >&2
  exit 1
}

cleanup_local_tmp() {
  rm -f "$CODE_ARCHIVE" "$UPLOADS_ARCHIVE" "$DB_DUMP" 2>/dev/null || true
}

trap cleanup_local_tmp EXIT

# =========================
# Preconditions
# =========================
[ -f "package.json" ] || fail "Run this script from the Strapi project root (cms)."
[ -f ".env" ] || fail ".env not found in current directory."

mkdir -p "$TMP_DIR"

# Загружаем локальные env-переменные Strapi
set -a
# shellcheck disable=SC1091
source ./.env
set +a

: "${DATABASE_USERNAME:?DATABASE_USERNAME is missing in .env}"
: "${DATABASE_PASSWORD:?DATABASE_PASSWORD is missing in .env}"
: "${DATABASE_NAME:?DATABASE_NAME is missing in .env}"
: "${DATABASE_PORT:?DATABASE_PORT is missing in .env}"
: "${DATABASE_HOST:?DATABASE_HOST is missing in .env}"

DUMP_HOST="$DATABASE_HOST"
if [ "$DATABASE_HOST" = "127.0.0.1" ] || [ "$DATABASE_HOST" = "localhost" ]; then
  DUMP_HOST="host.docker.internal"
fi

CODE_ARCHIVE_BASENAME="$(basename "$CODE_ARCHIVE")"
UPLOADS_ARCHIVE_BASENAME="$(basename "$UPLOADS_ARCHIVE")"
DB_DUMP_BASENAME="$(basename "$DB_DUMP")"

# =========================
# 1) Build locally
# =========================
if [ "${SKIP_BUILD:-0}" != "1" ]; then
  log "Building Strapi admin locally"
  npm run build
else
  log "Skipping local build (SKIP_BUILD=1)"
fi

# =========================
# 2) Dump local Postgres
# =========================
if [ "${SKIP_DB:-0}" != "1" ]; then
  log "Creating local database dump"

  docker run --rm \
    -e PGPASSWORD="$DATABASE_PASSWORD" \
    postgres:16 \
    pg_dump \
    --clean \
    --if-exists \
    --no-owner \
    --no-privileges \
    -h "$DUMP_HOST" \
    -p "$DATABASE_PORT" \
    -U "$DATABASE_USERNAME" \
    -d "$DATABASE_NAME" \
    > "$DB_DUMP"

  [ -s "$DB_DUMP" ] || fail "Database dump file is empty."
else
  log "Skipping database dump (SKIP_DB=1)"
fi

# =========================
# 3) Archive code
# =========================
log "Archiving Strapi code"

tar -czf "$CODE_ARCHIVE" \
  --exclude="./node_modules" \
  --exclude="./.git" \
  --exclude="./.deploy-tmp" \
  --exclude="./strapi_dump.sql" \
  --exclude="./.env" \
  --exclude="./public/uploads" \
  .

[ -s "$CODE_ARCHIVE" ] || fail "Code archive was not created."

# =========================
# 4) Archive uploads
# =========================
if [ "${SKIP_UPLOADS:-0}" != "1" ]; then
  if [ -d "public/uploads" ]; then
    log "Archiving uploads"
    tar -czf "$UPLOADS_ARCHIVE" -C public uploads
    [ -s "$UPLOADS_ARCHIVE" ] || fail "Uploads archive was not created."
  else
    log "No public/uploads directory found, skipping uploads"
    SKIP_UPLOADS=1
  fi
else
  log "Skipping uploads (SKIP_UPLOADS=1)"
fi

# =========================
# 5) Upload artifacts
# =========================
log "Uploading artifacts to server"

scp "$CODE_ARCHIVE" "${SERVER_USER}@${SERVER_HOST}:${REMOTE_BASE}/"

if [ "${SKIP_DB:-0}" != "1" ]; then
  scp "$DB_DUMP" "${SERVER_USER}@${SERVER_HOST}:${REMOTE_BASE}/"
fi

if [ "${SKIP_UPLOADS:-0}" != "1" ] && [ -f "$UPLOADS_ARCHIVE" ]; then
  scp "$UPLOADS_ARCHIVE" "${SERVER_USER}@${SERVER_HOST}:${REMOTE_BASE}/"
fi

# =========================
# 6) Remote deploy
# =========================
log "Deploying on remote server"

ssh "${SERVER_USER}@${SERVER_HOST}" bash <<EOF
set -Eeuo pipefail

REMOTE_BASE="$REMOTE_BASE"
REMOTE_APP="$REMOTE_APP"
REMOTE_RELEASES="$REMOTE_RELEASES"
TIMESTAMP="$TIMESTAMP"

CODE_ARCHIVE_BASENAME="$CODE_ARCHIVE_BASENAME"
UPLOADS_ARCHIVE_BASENAME="$UPLOADS_ARCHIVE_BASENAME"
DB_DUMP_BASENAME="$DB_DUMP_BASENAME"

SKIP_DB="${SKIP_DB:-0}"
SKIP_UPLOADS="${SKIP_UPLOADS:-0}"

cd "\$REMOTE_BASE"

mkdir -p "\$REMOTE_RELEASES"
rm -rf app.new
mkdir -p app.new

echo "Unpacking code..."
tar -xzf "\$CODE_ARCHIVE_BASENAME" -C app.new

# Сохраняем серверный .env
if [ -f "\$REMOTE_APP/.env" ]; then
  echo "Preserving remote .env..."
  cp "\$REMOTE_APP/.env" app.new/.env
fi

# Сохраняем Dockerfile, если по какой-то причине его нет в архиве
if [ ! -f app.new/Dockerfile ] && [ -f "\$REMOTE_APP/Dockerfile" ]; then
  echo "Preserving remote Dockerfile..."
  cp "\$REMOTE_APP/Dockerfile" app.new/Dockerfile
fi

# Uploads:
# - если SKIP_UPLOADS=1, оставляем серверные uploads
# - иначе разворачиваем локальные uploads
if [ "\$SKIP_UPLOADS" = "1" ]; then
  if [ -d "\$REMOTE_APP/public/uploads" ]; then
    echo "Preserving remote uploads..."
    mkdir -p app.new/public/uploads
    cp -a "\$REMOTE_APP/public/uploads/." app.new/public/uploads/
  fi
else
  if [ -f "\$UPLOADS_ARCHIVE_BASENAME" ]; then
    echo "Applying local uploads archive..."
    mkdir -p app.new/public
    tar -xzf "\$UPLOADS_ARCHIVE_BASENAME" -C app.new/public
  else
    echo "Uploads archive not found, continuing without replacing uploads."
    if [ -d "\$REMOTE_APP/public/uploads" ]; then
      mkdir -p app.new/public/uploads
      cp -a "\$REMOTE_APP/public/uploads/." app.new/public/uploads/
    fi
  fi
fi

# Ротация app
if [ -d "\$REMOTE_APP" ]; then
  mv "\$REMOTE_APP" "\$REMOTE_RELEASES/app-prev-\$TIMESTAMP"
fi

mv app.new app

echo "Rebuilding Strapi container..."
docker compose up -d --build strapi

if [ "\$SKIP_DB" != "1" ] && [ -f "\$DB_DUMP_BASENAME" ]; then
  echo "Importing database..."
  cat "\$DB_DUMP_BASENAME" | docker exec -i strapi_test_db psql -U ecurrency_user -d ecurrency_db
fi

echo "Restarting Strapi..."
docker compose restart strapi

echo "Cleaning uploaded artifacts..."
rm -f "\$CODE_ARCHIVE_BASENAME"
rm -f "\$UPLOADS_ARCHIVE_BASENAME" || true
rm -f "\$DB_DUMP_BASENAME" || true

echo "Done."
EOF

log "Deployment finished successfully"
echo "Open:"
echo "  CMS: https://api.5.78.109.141.nip.io/admin"