import { slugifyStr } from "@utils/slugify";
import type { CollectionEntry } from "astro:content";
import Datetime from "./Datetime";

export interface Props {
  href?: string;
  image?: string;
  frontmatter: CollectionEntry<"games">["data"];
  secHeading?: boolean;
}

export default function Card({
  href,
  image,
  frontmatter,
  secHeading = true,
}: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-lg font-medium decoration-dashed hover:underline",
  };

  return (
    <li className="my-6">
      <img className="max-h-10 w-full" src={image} />
      <a
        href={href}
        className="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
      </a>
      <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      <p>{description}</p>
    </li>
  );
}
