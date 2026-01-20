import BlogPost from "@/components/BlogPost";
import { client } from "@/sanity/client";
import { getAllPostsQuery } from "@/sanity/queries";
import { Post } from "@/types";
import Link from "next/link";

// Disable caching to always fetch fresh content during development
export const revalidate = 0;

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await client.fetch(getAllPostsQuery);
    return posts || [];
  } catch (error) {
    console.log("Error fetching from Sanity:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl">
        <div className="blog-post">
          <h2 className="blog-post-title">Welcome to Johan Moreno&apos;s Blog</h2>
          <div className="blog-post-content">
            <p>
              No posts yet! Head over to{" "}
              <Link 
                href="http://localhost:3333" 
                target="_blank"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                Sanity Studio
              </Link>{" "}
              to create your first blog post.
            </p>
            <p className="mt-4">
              <strong>Quick start:</strong>
            </p>
            <ol className="list-decimal ml-6 mt-2 space-y-2">
              <li>Open Sanity Studio at <code style={{ color: "var(--accent)" }}>http://localhost:3333</code></li>
              <li>Click &quot;Author&quot; and create yourself as an author</li>
              <li>Click &quot;Post&quot; and write your first blog post</li>
              <li>Refresh this page to see your content!</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {posts.map((post) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </div>
  );
}
