// Posts
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

// Notion

type PostContentValue = {
  alive: boolean;
  created_by_id: string;
  created_by_table: string;
  created_time: number;
  id: string;
  last_edited_by_id: string;
  last_edited_by_table: string;
  last_edited_time: number;
  parent_id: string;
  parent_table: string;
  properties: {
    title: string[];
    language?: string[][];
    html?: string;
    description?: string;
    link?: string;
  };
  shard_id: number;
  space_id: string;
  type: string;
  version: number;
  format?: {
    block_width?: number;
    block_height?: number;
    display_source?: string;
    block_aspect_ratio?: number;
    page_icon?: string;
  };
  file_ids: string[];
};

type PostContent = {
  role: string;
  value: PostContentValue;
};

export type NotionPost = {
  id: string;
  Authors: string[];
  Slug: string;
  Published: 'Yes' | 'No';
  Date: number;
  Page: string;
  Emoji?: string;
  Tag: string;
  ColorCode: string;
  preview: unknown[][];
  content: PostContent[];
  hasTweet: boolean;
};

export type NotionPosts = NotionPost[];

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
