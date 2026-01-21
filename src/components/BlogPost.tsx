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
        {(() => {
          if (!post.body) return null;
          
          // Find the index of the break block
          const breakIndex = post.body.findIndex((block: any) => block._type === 'break');
          
          // Determine content to show: all if no break, or sliced up to break
          const contentToShow = breakIndex !== -1 
            ? post.body.slice(0, breakIndex) 
            : post.body;

          return (
            <>
              <PortableText value={contentToShow} components={portableTextComponents} />
              
              {breakIndex !== -1 && (
                <div className="mt-6 md:mt-8">
                  <Link 
                    href={`/post/${post.slug.current}`}
                    className="headline-link inline-flex items-center text-sm font-medium"
                  >
                    View the remaining content
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </>
          );
        })()}
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
