// Post
export type Post = MarkDownPost | NotionAPIPost;

export type Posts = Post[];

export type BlogState = {
  posts: Posts;
};

// MarkDownPost

export const isMarkDownPost = (arg: any): arg is MarkDownPost => {
  return arg.emoji !== undefined;
};

export interface MarkDownPost {
  title?: string;
  date?: Date;
  slug?: string;
  author?: Author;
  content?: string;
  coverImage?: string;
  excerpt?: string;
  tags?: string[];
  categories?: string[];
  color?: string;
  emoji?: string;
}
export type MarkDownPosts = MarkDownPost[];

export type MarkDownBlogState = {
  posts: MarkDownPosts;
};

export interface Author {
  name: string;
  picture: string;
}
export const isAuthor = (params: unknown): params is Author => {
  const author = params as Author;
  return typeof author?.name === 'string' && typeof author?.picture === 'string';
};

// Notion

export const isNotionPost = (arg: any): arg is NotionPost => {
  return arg.id !== undefined;
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

export type NotionBlogState = {
  posts: NotionPosts;
};

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

// Notion-API

import type {
  BlockObjectResponse,
  CommentObjectResponse,
  CreateCommentParameters,
  DatabaseObjectResponse,
  ListCommentsResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

/* Replace */
export type NotionDatabaseObjectResponse = DatabaseObjectResponse;
export type NotionPageObjectResponse = PageObjectResponse;
export type NotionBlockObjectResponse = BlockObjectResponse;
export type NotionListCommentsResponse = ListCommentsResponse;
export type NotionCommentObjectResponse = CommentObjectResponse;
export type NotionRichTextItemResponse = RichTextItemResponse;
export type NotionCreateCommentParameters = CreateCommentParameters; // Request only

/* Extract */
export type NotionDatabaseProperty = NotionDatabaseObjectResponse['properties'];
export type NotionDatabasePropertyConfigResponse =
  NotionDatabaseObjectResponse['properties'][string];
export type NotionSelectPropertyResponse = Extract<
  NotionDatabasePropertyConfigResponse,
  { type: 'select' }
>['select']['options'][number];
export type NotionSelectColor = NotionSelectPropertyResponse['color'];
export type NotionRichTextItemRequest = CreateCommentParameters['rich_text'][number]; // Request only

/* Custom */
export type NotionAPIPosts = NotionAPIPost[];

export type NotionAPIBlogState = {
  posts: NotionAPIPosts;
};

export type NotionAPIPost = {
  id: string;
  icon: string;
  title: string;
  description?: string;
  category: NotionSelectPropertyResponse;
  date: string;
  slug: string;
  colorCode: string;
  updatedAt: string;
  tags: string[];
  content?: string;
};

export type NotionAPIPostWithChildren = NotionAPIPost & {
  children: NotionBlockObjectResponse[];
};
export type NotionBlogProperties = {
  categories: NotionSelectPropertyResponse[];
  tags: NotionSelectPropertyResponse[];
};
export type NotionBlogPropertiesWithCount = {
  categories: (NotionSelectPropertyResponse & { count: number })[];
  tags: (NotionSelectPropertyResponse & { count: number })[];
};

export type Ogp = {
  url: string;
  title: string;
  description: string;
  faviconUrl: string;
  imageUrl: string;
};
