// Script to seed sample pages in Sanity
// Run with: npx ts-node --esm scripts/seed-pages.ts

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'll6z9y20',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to set this
})

const samplePages = [
  {
    _type: 'page',
    _id: 'page-about',
    title: 'About',
    slug: {_type: 'slug', current: 'about'},
    content: [
      {
        _type: 'block',
        _key: 'about-block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Hey, I\'m Johan Moreno—engineer, builder, and lifelong learner based in the heart of technology and innovation.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'about-block2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'I spend my days crafting digital experiences, exploring emerging technologies, and building products that make a difference. My journey began with a curiosity about how things work, which evolved into a passion for creating things that matter.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'about-block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'When I\'m not coding, you\'ll find me reading about philosophy, exploring new cities, or experimenting in the kitchen. I believe in the power of continuous learning and the importance of building in public.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'about-block4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span4',
            text: 'This blog is my digital garden—a place where I share thoughts on technology, life lessons, and the journey of building meaningful things. Welcome, and I hope you find something here that resonates with you.',
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: 'page',
    _id: 'page-portfolio',
    title: 'Portfolio',
    slug: {_type: 'slug', current: 'portfolio'},
    content: [
      {
        _type: 'block',
        _key: 'portfolio-block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Here\'s a collection of projects I\'ve built over the years. Each one represents a unique challenge and an opportunity to learn something new.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'portfolio-block2',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Digital Experiences',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'portfolio-block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'From web applications to mobile apps, I\'ve had the privilege of working on projects that reach thousands of users. My focus is always on creating intuitive, performant, and accessible experiences.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'portfolio-block4',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'span4',
            text: 'Open Source',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'portfolio-block5',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span5',
            text: 'I\'m a strong believer in open source software. I contribute to various projects and maintain a few of my own. Check out my GitHub for the latest updates.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'portfolio-block6',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'span6',
            text: 'Side Projects',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'portfolio-block7',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span7',
            text: 'I love experimenting with new ideas and technologies. Some become full products, others remain experiments—but all of them teach me something valuable.',
          },
        ],
        markDefs: [],
      },
    ],
  },
  {
    _type: 'page',
    _id: 'page-work',
    title: 'Work',
    slug: {_type: 'slug', current: 'work'},
    content: [
      {
        _type: 'block',
        _key: 'work-block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'My professional journey has taken me through various roles and industries, each shaping my perspective as a builder and problem solver.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'work-block2',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Current Focus',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'work-block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'I\'m currently focused on building innovative products at the intersection of technology and human experience. My work involves full-stack development, system design, and leading technical initiatives.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'work-block4',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'span4',
            text: 'Experience',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'work-block5',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span5',
            text: 'Over the years, I\'ve worked with startups and established companies alike. Each experience has taught me the importance of adaptability, clear communication, and relentless focus on delivering value.',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'work-block6',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'span6',
            text: 'Let\'s Connect',
          },
        ],
        markDefs: [],
      },
      {
        _type: 'block',
        _key: 'work-block7',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span7',
            text: 'I\'m always interested in hearing about new opportunities, collaborations, or just having a conversation about technology and building. Feel free to reach out through any of my social channels.',
          },
        ],
        markDefs: [],
      },
    ],
  },
]

async function seedPages() {
  console.log('Creating pages...')
  
  for (const page of samplePages) {
    await client.createOrReplace(page)
    console.log(`✓ Created: ${page.title}`)
  }

  console.log('\n✅ All pages created!')
  console.log('Visit the pages at:')
  console.log('  - http://localhost:3001/about')
  console.log('  - http://localhost:3001/portfolio')
  console.log('  - http://localhost:3001/work')
  console.log('\nYou can edit these pages in Sanity Studio at http://localhost:3333')
}

seedPages().catch(console.error)
