# eCurrency Project

Monorepo for the eCurrency website platform.

## Stack

- Frontend: Next.js
- CMS: Strapi
- Database: PostgreSQL
- Local DB runtime: Docker
- Hosting target:
  - Frontend: Vercel
  - CMS: VPS
  - Database: PostgreSQL

## Project structure

- `frontend/` — Next.js application
- `cms/` — Strapi CMS
- `docs/` — project documentation
- `docker-compose.yml` — local PostgreSQL setup

## Local development

### 1. Start PostgreSQL

```bash
docker compose up -d