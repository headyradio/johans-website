import Link from 'next/link';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import SocialShare from './SocialShare';
import { Post } from '@/types';
import { urlFor } from '@/sanity/client';

interface BlogPostProps {
  post: Post;
  isPreview?: boolean;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();
}

// Custom components for rendering Portable Text with images
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog post image'}
            width={800}
            height={450}
            className="rounded-lg w-full h-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          {value.caption && (
            <figcaption className="text-center text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function BlogPost({ post, isPreview = true }: BlogPostProps) {
  const postUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/post/${post.slug.current}`
    : `/post/${post.slug.current}`;

  return (
    <article className="blog-post">
      <h2 className="blog-post-title">
        <Link href={`/post/${post.slug.current}`} className="headline-link">
          {post.title}
        </Link>
      </h2>

      {/* Main Image */}
      {post.mainImage?.asset && (
        <figure className="my-6">
          <Image
            src={urlFor(post.mainImage).width(800).url()}
            alt={post.mainImage.alt || post.title}
            width={800}
            height={450}
            className="rounded-lg w-full h-auto"
            style={{ maxWidth: '100%', height: 'auto' }}
            priority={isPreview}
          />
          {post.mainImage.caption && (
            <figcaption className="text-center text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              {post.mainImage.caption}
            </figcaption>
          )}
        </figure>
      )}
      
      <div className="blog-post-content">
        {post.body && <PortableText value={post.body} components={portableTextComponents} />}
      </div>

      <div className="flex items-center justify-between mt-6">
        <time className="blog-post-date" dateTime={post.publishedAt}>
          {formatDate(post.publishedAt)}
        </time>
        <SocialShare url={postUrl} title={post.title} />
      </div>
    </article>
  );
}
