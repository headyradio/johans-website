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
    },
    "categories": categories[]->{
      title,
      slug
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
    },
    "categories": categories[]->{
      title,
      slug
    }
  }
`;

export const getPostsByCategoryQuery = `
  *[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
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
    },
    "categories": categories[]->{
      title,
      slug
    }
  }
`;

export const getCategoryBySlugQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    title,
    description
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
