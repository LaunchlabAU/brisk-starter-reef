import { f, type LinkValue } from '@briskcms/kit/fields.js';
import type { SiteDefinition } from '@briskcms/kit/site.js';
import type { RichText } from '@briskcms/kit/rich-text.js';
import type { Settings } from '@briskcms/kit/settings.js';

// Reef: a blog theme by Aloha Pixel (MIT, upstream a92d845; see
// UPSTREAM.md), onboarded with thin, prop-driven sections on its own
// styles. Its posts belong to a topic, a collection the site keeps.

export type Image = { asset: string; alt: string };
export type Section =
  | {
      id: string;
      type: 'hero';
      heading: string;
      accent: string;
      body: string;
      image: Image;
      cta: LinkValue;
      ctaLabel: string;
    }
  | {
      id: string;
      type: 'latest-posts';
      heading: string;
      intro: string;
      count: number;
    }
  | {
      id: string;
      type: 'featured-post';
      heading: string;
      post: { post: string };
    }
  | { id: string; type: 'topic-strip'; heading: string; intro: string }
  | {
      id: string;
      type: 'studio-note';
      heading: string;
      body: string;
      signature: string;
    }
  | {
      id: string;
      type: 'newsletter-invite';
      heading: string;
      body: string;
      action: LinkValue;
      actionLabel: string;
    };
export type FaqItem = { question: string; answer: string };
export type Page = {
  slug: string;
  title: string;
  description: string;
  updatedAt?: string | undefined;
  publishedAt?: string | undefined;
  faqs: FaqItem[];
  sections: Section[];
};
export type Post = {
  slug: string;
  title: string;
  description: string;
  headline: string;
  summary: string;
  cover: Image;
  body: RichText;
  author: string;
  status: 'published' | 'unpublished';
  updatedAt?: string | undefined;
  publishedAt?: string | undefined;
  faqs: FaqItem[];
  /** The topic it belongs to, by slug. */
  topic: string;
};
export type Topic = {
  slug: string;
  name: string;
  description: string;
  tone: 'coral' | 'reef' | 'ink';
};
export type Author = {
  slug: string;
  name: string;
  bio?: string | undefined;
  kind?: 'organization' | undefined;
};
export type NavigationEntry =
  | (({ page: string } | { post: string } | { blog: true }) & {
      label?: string | undefined;
    })
  // Another website, under its own label.
  | { url: string; label: string };
export type Content = {
  version: 2;
  pages: Page[];
  posts: Post[];
  authors: Author[];
  navigation: NavigationEntry[];
  blog: { title: string; description: string };
  redirects: { from: string; to: string }[];
  gone: string[];
  /** Who the site is and how to reach it (from content version 2). */
  settings: Settings;
  collections: { topics: Topic[] };
};

const image = (asset: string, alt: string) => ({ asset, alt });
const paragraphs = (...texts: string[]): RichText =>
  texts.map((text) => ({ t: 'p' as const, c: [text] }));

export const reef: SiteDefinition = {
  id: 'reef',
  name: 'Reef (blog)',
  // Version 2 keeps the site's name and details in its settings, where
  // editors change them; version 1 gave them in seo. Nothing moves content
  // from one to the other: content of version 1 moves by hand, to version
  // 2 with its settings' name and summary.
  contentVersion: 2,
  // Agency placeholders, drawn for this package (no upstream photographs).
  assets: [
    {
      asset: 'reef-hero.svg',
      alt: 'Layered waves in turquoise and sand',
      width: 1600,
      height: 900,
    },
    {
      asset: 'reef-cover-craft.svg',
      alt: 'Turquoise waves over a pale shore',
      width: 1200,
      height: 800,
    },
    {
      asset: 'reef-cover-design.svg',
      alt: 'Coral waves over a pale sand',
      width: 1200,
      height: 800,
    },
    {
      asset: 'reef-cover-studio.svg',
      alt: 'Slate waves under a grey sky',
      width: 1200,
      height: 800,
    },
  ],
  components: {
    hero: {
      label: 'Hero',
      description:
        'Opens every page: a big heading with one accent word, an introduction, an image and a call to action.',
      fields: {
        heading: f.text('Heading', 120),
        accent: f.text('Accent word (part of the heading)', 40),
        body: f.text('Introduction', 400),
        image: f.image('Image'),
        cta: f.link('Call to action', { phone: true, external: true }),
        ctaLabel: f.text('Call to action label', 40),
      },
    },
    'latest-posts': {
      label: 'Latest posts',
      description: 'The newest posts, as cards.',
      fields: {
        heading: f.text('Heading', 120),
        intro: f.text('Introduction', 300),
        count: f.number('How many posts', 3, 9),
      },
    },
    'featured-post': {
      label: 'Featured post',
      description: 'One post, chosen, shown large.',
      fields: {
        heading: f.text('Heading', 120),
        post: f.post('Post'),
      },
    },
    'topic-strip': {
      label: 'Topics',
      description: 'The topics that have posts, each linking to its posts.',
      fields: {
        heading: f.text('Heading', 120),
        intro: f.text('Introduction', 300),
      },
    },
    'studio-note': {
      label: 'Studio note',
      description: 'A short signed note from the team.',
      fields: {
        heading: f.text('Heading', 120),
        body: f.body('Note', 1200),
        signature: f.text('Signature', 80),
      },
    },
    'newsletter-invite': {
      label: 'Newsletter invite',
      description:
        'An invitation to follow the blog or get in touch: by email (a mailto: address), the feed, a phone number or another website. A static site sends no forms.',
      fields: {
        heading: f.text('Heading', 120),
        body: f.text('Text', 400),
        action: f.link('Where it leads', {
          feed: true,
          email: true,
          phone: true,
          external: true,
        }),
        actionLabel: f.text('Button label', 40),
      },
    },
  },
  collections: {
    topics: {
      label: 'Topics',
      description: 'What posts are about; every post belongs to one.',
      max: 24,
      fields: {
        name: f.text('Name', 40),
        description: f.text('Description', 300),
        tone: f.choice('Tone', ['coral', 'reef', 'ink']),
      },
    },
  },
  post: { fields: { topic: f.ref('Topic', 'topics') } },
  page: { opening: 'hero', maxSections: 12, maxFaqs: 10 },
  postPrefix: 'blog',
  fixedRoutes: ['home', 'about'],
  navigation: { max: 8 },
  // Self-hosted fonts, and the theme toggle's scripts, from the site's own
  // files: brisk.json names anything else its pages may run or load
  // (other sites, inline scripts).
  security: { scripts: 'bundled', fonts: true },
  // Its name and details are settings, which editors change.
  settings: {},
  seo: { lang: 'en-AU', timeZone: 'Australia/Sydney' },
  seed: {
    version: 2,
    pages: [
      {
        slug: 'home',
        title: 'Reef — notes on building calm, durable websites',
        description:
          'A journal about the craft of the web: clear writing, durable markup, careful design and the studio that makes them.',
        faqs: [],
        sections: [
          {
            id: 'intro',
            type: 'hero',
            heading: 'Websites that stay calm under pressure.',
            accent: 'calm',
            body: 'Notes from a small studio on craft, design and the slow work of building pages that last.',
            image: image(
              'reef-hero.svg',
              'Layered waves in turquoise and sand',
            ),
            cta: { blog: true },
            ctaLabel: 'Read the journal',
          },
          {
            id: 'latest',
            type: 'latest-posts',
            heading: 'Latest notes',
            intro: 'The newest writing from the studio.',
            count: 3,
          },
          {
            id: 'featured',
            type: 'featured-post',
            heading: 'Worth your time',
            post: { post: 'writing-html-that-ages-well' },
          },
          {
            id: 'topics',
            type: 'topic-strip',
            heading: 'Topics',
            intro: 'What we write about, and how often.',
          },
          {
            id: 'note',
            type: 'studio-note',
            heading: 'From the studio',
            body: 'We write these notes for the people who look after websites day to day. If one saves you an afternoon, it has done its job.',
            signature: 'The Reef team',
          },
          {
            id: 'newsletter',
            type: 'newsletter-invite',
            heading: 'Follow along',
            body: 'New notes appear every few weeks. Follow the feed in your reader of choice.',
            action: { feed: true },
            actionLabel: 'Subscribe to the feed',
          },
        ],
      },
      {
        slug: 'about',
        title: 'About Reef — the studio behind the journal',
        description:
          'Who writes Reef: a small studio that builds calm, durable websites and writes down what it learns along the way.',
        faqs: [],
        sections: [
          {
            id: 'intro',
            type: 'hero',
            heading: 'A small studio with a long view.',
            accent: 'long',
            body: 'We build websites for teams who would rather not rebuild them every two years.',
            image: image(
              'reef-hero.svg',
              'Layered waves in turquoise and sand',
            ),
            cta: { page: 'home' },
            ctaLabel: 'Back to the journal',
          },
          {
            id: 'note',
            type: 'studio-note',
            heading: 'How we work',
            body: 'Plain markup, honest content and a design system small enough to keep in your head.',
            signature: 'The Reef team',
          },
        ],
      },
    ],
    posts: [
      {
        slug: 'writing-html-that-ages-well',
        title: 'Writing HTML that ages well — notes from Reef',
        description:
          'Why the most durable part of a website is its markup, and how to write HTML that survives the next redesign.',
        headline: 'Writing HTML that ages well',
        summary:
          'The most durable part of a website is its markup. Here is how to write it so it outlives the design.',
        cover: image(
          'reef-cover-craft.svg',
          'Turquoise waves over a pale shore',
        ),
        body: paragraphs(
          'Designs change every few years; good markup can stay put for a decade.',
          'Start from the content, name things for what they are, and leave the styling to the stylesheet.',
        ),
        author: 'reef-team',
        status: 'published',
        publishedAt: '2026-09-01T00:00:00.000Z',
        faqs: [],
        topic: 'craft',
      },
      {
        slug: 'a-type-scale-you-can-defend',
        title: 'A type scale you can defend — notes from Reef',
        description:
          'How to choose a type scale for a website that reads well everywhere, and how to explain the choice to a client.',
        headline: 'A type scale you can defend',
        summary: 'Pick a ratio, test it on real content, and write down why.',
        cover: image('reef-cover-design.svg', 'Coral waves over a pale sand'),
        body: paragraphs(
          'A type scale is a promise about rhythm.',
          'Test it with your longest headline and your shortest caption before you commit.',
        ),
        author: 'reef-team',
        status: 'published',
        publishedAt: '2026-09-15T00:00:00.000Z',
        faqs: [],
        topic: 'design',
      },
      {
        slug: 'what-a-good-brief-looks-like',
        title: 'What a good brief looks like — notes from Reef',
        description:
          'The few things a website brief needs to say, and the many it can leave out, from a studio that reads a lot of them.',
        headline: 'What a good brief looks like',
        summary: 'A good brief names the reader, the job and the deadline.',
        cover: image('reef-cover-studio.svg', 'Slate waves under a grey sky'),
        body: paragraphs(
          'Most briefs say too much about colours and too little about readers.',
          'Tell us who reads the site and what they need to do; we will take it from there.',
        ),
        author: 'reef-team',
        status: 'published',
        publishedAt: '2026-10-01T00:00:00.000Z',
        faqs: [],
        topic: 'studio',
      },
    ],
    authors: [
      { slug: 'reef-team', name: 'The Reef team', kind: 'organization' },
    ],
    navigation: [{ page: 'home' }, { page: 'about' }, { blog: true }],
    blog: {
      title: 'The Reef journal — notes on calm, durable websites',
      description:
        'Every note from the Reef studio on craft, design and the work of building websites that last.',
    },
    redirects: [],
    gone: [],
    settings: {
      name: 'Reef',
      summary:
        'Reef is a journal about building calm, durable websites: craft, design and the studio behind them.',
    },
    collections: {
      topics: [
        {
          slug: 'craft',
          name: 'Craft',
          description:
            'The slow half of the job: naming things well and writing markup that survives the next redesign.',
          tone: 'reef',
        },
        {
          slug: 'design',
          name: 'Design',
          description:
            'Type, colour and layout chosen on purpose, and explained in plain words.',
          tone: 'coral',
        },
        {
          slug: 'studio',
          name: 'Studio',
          description: 'How a small studio works: briefs, budgets and rhythm.',
          tone: 'ink',
        },
      ],
    },
  },
};
