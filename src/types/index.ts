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
  emoji?: string;
}

export interface Author {
  name: string;
  picture: string;
}
export const isAuthor = (params: unknown): params is Author => {
  const author = params as Author;
  return typeof author?.name === 'string' && typeof author?.picture === 'string';
};

export interface Tweet {
  url: string;
  authorName: string;
  authorUrl: string;
  html: string;
  width?: number;
  height?: number;
  type: string;
  cacheAge: string;
  providerName: string;
  providerUrl: string;
  version: string;
}

export interface NotionData {
  cursor: Cursor;
  recordMap: RecordMap;
}

interface RecordMap {
  block: any;
  space: any;
  collectionView: any;
  collection: any;
}

interface Cursor {
  stack: any;
}