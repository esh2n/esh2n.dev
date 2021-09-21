export interface Post {
  title?: string;
  date?: Date;
  slug?: string;
  author?: Author;
  content?: string;
  coverImage?: string;
  excerpt?: string;
  tags?: string[];
  category?: string;
  color?: string;
}

export interface Author {
  name: string;
  picture: string;
}
export const isAuthor = (params: unknown): params is Author => {
  const author = params as Author;
  return typeof author?.name === 'string' && typeof author?.picture === 'string';
};
