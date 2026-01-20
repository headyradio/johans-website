// Script to seed sample content in Sanity
// Run with: npx ts-node --esm scripts/seed-content.ts

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'll6z9y20',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to set this
})

const sampleAuthor = {
  _type: 'author',
  _id: 'author-johan',
  name: 'Johan Moreno',
  bio: 'Engineer, builder, and explorer of emerging technologies.',
}

const samplePosts = [
  {
    _type: 'post',
    _id: 'post-1',
    title: 'The Art of Building in Public',
    slug: {_type: 'slug', current: 'building-in-public'},
    publishedAt: '2026-01-19T10:00:00Z',
    excerpt: 'Why sharing your journey matters more than perfecting it.',
    author: {_type: 'reference', _ref: 'author-johan'},
    body: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'There\'s something powerful about building in public. When you share your work before it\'s "ready," you invite feedback, collaboration, and accountability.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'The fear of judgment is real. But the alternative—building in isolation—often leads to products that miss the mark. Your users know what they need better than you do.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'Start small. Share a screenshot. Write about what you learned today. The compound effect of consistent sharing is remarkable.',
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: 'post',
    _id: 'post-2',
    title: 'Why I Switched to a Headless CMS',
    slug: {_type: 'slug', current: 'headless-cms-switch'},
    publishedAt: '2026-01-18T14:00:00Z',
    excerpt: 'The flexibility of separating content from presentation.',
    author: {_type: 'reference', _ref: 'author-johan'},
    body: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Traditional CMSs couple your content with your frontend. This works until you want to publish to multiple platforms, or until your design needs to evolve independently of your content.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'A headless CMS gives you an API. Your content lives in one place but can be consumed anywhere—your website, mobile app, digital signage, or that future platform that doesn\'t exist yet.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'Sanity, in particular, offers real-time collaboration, a flexible schema system, and GROQ—a query language that makes fetching exactly what you need straightforward.',
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: 'post',
    _id: 'post-3',
    title: 'Micro-Decisions Shape Your Day',
    slug: {_type: 'slug', current: 'micro-decisions'},
    publishedAt: '2026-01-17T09:00:00Z',
    excerpt: 'The small choices we make compound into who we become.',
    author: {_type: 'reference', _ref: 'author-johan'},
    body: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'We obsess over the big decisions—which job to take, where to live, who to marry. But our days are shaped by hundreds of smaller choices we barely notice.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Checking your phone first thing in the morning. Responding to that Slack message immediately. Skipping the walk because you\'re "too busy."',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'These micro-decisions compound. The person who checks email after focused work rather than before it gets more done. The person who takes the stairs builds more energy over time.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'block4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span4',
            text: 'You don\'t need willpower to change your life. You need awareness of the tiny choices—and systems that make the right choice the easy one.',
          },
        ],
        markDefs: [],
      },
    ],
  },
]

async function seedContent() {
  console.log('Creating author...')
  await client.createOrReplace(sampleAuthor)
  console.log('✓ Author created')

  console.log('Creating posts...')
  for (const post of samplePosts) {
    await client.createOrReplace(post)
    console.log(`✓ Created: ${post.title}`)
  }

  console.log('\n✅ All sample content created!')
  console.log('Refresh your blog at http://localhost:3001 to see the posts.')
}

seedContent().catch(console.error)
