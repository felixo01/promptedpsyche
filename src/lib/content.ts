type DatedEntry = {
  data: {
    publishedAt: Date;
  };
};

export function sortByDateDesc<T extends DatedEntry>(entries: T[]) {
  return [...entries].sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}
