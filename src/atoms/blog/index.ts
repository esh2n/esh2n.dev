import { atom } from 'recoil';
import { BlogState, MarkDownBlogState, NotionAPIBlogState, NotionBlogState } from 'types';

const initialState: BlogState = {
  posts: null,
};

const initialMarkDownState: MarkDownBlogState = {
  posts: null,
};

const initialNotionState: NotionBlogState = {
  posts: null,
};

const initialNotionAPIState: NotionAPIBlogState = {
  posts: null,
};

export const blogState = atom({
  key: 'post',
  default: initialState,
});

export const markDownState = atom({
  key: 'markdown',
  default: initialMarkDownState,
});

export const notionState = atom({
  key: 'notion',
  default: initialNotionState,
});

export const notionAPIState = atom({
  key: 'notion-api',
  default: initialNotionAPIState,
});

export const inViewHeadingIdsAtom = atom<string[]>({
  key: 'inViewHeadingAtom',
  default: [],
});
