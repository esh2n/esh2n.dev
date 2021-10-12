import { atom } from 'recoil';
import { BlogState, MarkDownBlogState, NotionBlogState } from 'types';

const initialState: BlogState = {
  posts: null,
};

const initialMarkDownState: MarkDownBlogState = {
  posts: null,
};

const initialNotionState: NotionBlogState = {
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