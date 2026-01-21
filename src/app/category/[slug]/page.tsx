import { client } from "@/sanity/client";
import { getPostsByCategoryQuery, getCategoryBySlugQuery } from "@/sanity/queries";
import BlogPost from "@/components/BlogPost";
import { Post } from "@/types";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await client.fetch(getCategoryBySlugQuery, { slug });

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.title} Posts | Johan Moreno`,
    description: `Read all posts about ${category.title} by Johan Moreno.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await client.fetch(getCategoryBySlugQuery, { slug });

  if (!category) {
    notFound();
  }

  const posts = await client.fetch(getPostsByCategoryQuery, { slug });

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

      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold mb-4">{category.title}</h1>
        {category.description && (
          <p className="text-[var(--text-secondary)] text-lg">{category.description}</p>
        )}
      </div>

      <div className="space-y-12">
        {posts.length > 0 ? (
          posts.map((post: Post) => (
            <BlogPost key={post._id} post={post} />
          ))
        ) : (
          <p className="text-[var(--text-muted)]">No posts found in this category yet.</p>
        )}
      </div>
    </div>
  );
}
