import type { CollectionEntry } from "astro:content";

export default function getSortedGames(games: CollectionEntry<"games">[]) {
  return games.sort((a, b) => {
    const dateA = new Date(a.data.date);
    const dateB = new Date(b.data.date);

    if (dateA < dateB) {
      return 1;
    } else if (dateA > dateB) {
      return -1;
    } else {
      return 0;
    }
  });
}
