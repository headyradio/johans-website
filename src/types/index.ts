export interface Category {
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
    caption?: string;
  };
  body: any[];
  author?: {
    name: string;
    image?: any;
  };
  categories?: Category[];
}

export interface Page {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  heroImage?: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  content: any[];
}
