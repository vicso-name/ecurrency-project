type ArticleCardProps = {
  title: string;
};

export function ArticleCard({ title }: ArticleCardProps) {
  return <article>{title}</article>;
}