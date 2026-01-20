import { client } from "@/sanity/client";
import { getPostBySlugQuery } from "@/sanity/queries";
import { Post } from "@/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import SocialShare from "@/components/SocialShare";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/client";

// Disable caching for development
export const revalidate = 0;

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .toUpperCase();
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

async function getPost(slug: string): Promise<Post | null> {
  try {
    const post = await client.fetch(getPostBySlugQuery, { slug });
    return post || null;
  } catch (error) {
    console.log("Error fetching post:", error);
    return null;
  }
}



// Helper to get base URL
const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000'; // Default for local dev
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const baseUrl = getBaseUrl();
  const ogImage = post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined;

  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} on Johan Moreno's Blog`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${baseUrl}/post/${post.slug.current}`,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = getBaseUrl();
  const postUrl = `${baseUrl}/post/${post.slug.current}`;

  return (
    <div className="max-w-2xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm mb-8 group"
        style={{ color: "var(--text-secondary)" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform group-hover:-translate-x-1"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to all posts
      </Link>

      <article className="blog-post">
        <h1 className="blog-post-title text-4xl">{post.title}</h1>

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
              priority
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

        <div className="flex items-center justify-between mt-8">
          <time className="blog-post-date" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <SocialShare url={postUrl} title={post.title} />
        </div>
      </article>
    </div>
  );
}
