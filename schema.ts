import { z } from 'zod';
import { deriveSite } from '@briskcms/kit/site.js';
import {
  reef,
  type Content as SiteContent,
  type Page as SitePage,
  type Post as SitePost,
  type NavigationEntry as SiteNavigationEntry,
  type Topic as SiteTopic,
} from './definition.js';

// Reef's content contract, derived from its definition, with the static
// types its templates use.
export const site = deriveSite(reef);
type Schema<T> = z.ZodType<T, unknown>;
export const content = site.content as unknown as Schema<SiteContent>;
export type Content = SiteContent;
export type Page = SitePage;
export type Post = SitePost;
export type Topic = SiteTopic;
export type NavigationEntry = SiteNavigationEntry;
export const postRoute = site.postRoute;
export const seed: Content = site.seed as Content;
