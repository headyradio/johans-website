import { client, urlFor } from "@/sanity/client";
import { getPageBySlugQuery } from "@/sanity/queries";
import { Page } from "@/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 0;

async function getPage(): Promise<Page | null> {
  try {
    const page = await client.fetch(getPageBySlugQuery, { slug: "about" });
    return page;
  } catch (error) {
    console.log("Error fetching page:", error);
    return null;
  }
}

export default async function AboutPage() {
  const page = await getPage();

  if (!page) {
    return (
      <div className="max-w-2xl">
        <div className="blog-post">
          <h1 className="blog-post-title">About</h1>
          <div className="blog-post-content">
            <p>
              This page content is managed in Sanity. Go to{" "}
              <a href="http://localhost:3333" target="_blank" className="underline" style={{ color: "var(--accent)" }}>
                Sanity Studio
              </a>{" "}
              to add content.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="blog-post">
        <h1 className="blog-post-title">{page.title}</h1>
        {page.heroImage?.asset && (
          <div className="mb-8">
            <Image
              src={urlFor(page.heroImage).width(800).height(400).url()}
              alt={page.heroImage.alt || page.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-sm"
            />
          </div>
        )}
        <div className="blog-post-content">
          <PortableText value={page.content} />
        </div>
      </div>
    </div>
  );
}
