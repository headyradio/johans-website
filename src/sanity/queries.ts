export const getAllPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body,
    "author": author->{
      name,
      image
    }
  }
`;

export const getPostBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage,
    body,
    "author": author->{
      name,
      image
    }
  }
`;

export const getPageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    heroImage,
    content
  }
`;
