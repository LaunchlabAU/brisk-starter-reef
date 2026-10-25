import { build as astro } from 'astro:config/server';
import { siteBuild } from '@briskcms/kit/build.js';
import { content as given, origin, shareNames, sizes } from 'brisk:content';
import { content, site, type Topic } from '../schema';

// The site's build helpers (@briskcms/kit/build.js), from the build's
// inputs: its content (brisk:content, which the Brisk integration reads
// from content/, or the folder a Brisk preview names, or else the seed),
// its address, the release's assets prefix, share image names and image
// sizes.
export const build = siteBuild({
  site,
  data: content.parse(given),
  origin,
  pinned:
    typeof astro.assetsPrefix === 'string' ? astro.assetsPrefix : undefined,
  shareNames,
  sizes,
  // The about page keeps its short label in the navigation.
  labels: { about: 'About' },
});
export const {
  data,
  seo,
  postPrefix,
  sizeOf,
  rootFrom,
  releaseUrl,
  linkFrom,
  linkValue,
  navigationLabel,
  routeOf,
  authorOf,
  longDate,
  postsNewestFirst,
  siteImage,
} = build;

/** The site's topics, in their order (a collection). */
export const topics = (): Topic[] => data.collections.topics;
/** A topic by slug. */
export const topicOf = (slug: string) =>
  data.collections.topics.find((t) => t.slug === slug)!;
/** The colour classes a topic's tone gives a chip and a dot. */
// Reef's primary colour is its turquoise and its accent the coral
// (tokens.css), so each tone takes its own (upstream's topicTone.ts
// predates that swap).
export const toneClasses = {
  coral: { dot: 'bg-accent', chip: 'bg-accent/15 text-accent-text' },
  reef: { dot: 'bg-primary', chip: 'bg-primary/12 text-primary-text' },
  ink: { dot: 'bg-foreground', chip: 'bg-foreground/8 text-foreground' },
} as const;
