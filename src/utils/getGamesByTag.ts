import getSortedGames from "@utils/getSortedGames";
import type { CollectionEntry } from "astro:content";
import { slugifyAll } from "./slugify";

const getGamesByTag = (games: CollectionEntry<"games">[], tag: string) =>
  getSortedGames(
    games.filter(game => slugifyAll(game.data.tags).includes(tag))
  );

export default getGamesByTag;
