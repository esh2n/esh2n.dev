import { NotionPost, MarkDownPost, NotionAPIPostWithChildren, NotionAPIPost } from 'types';

export const generateOgImageUrlByPost = (post: MarkDownPost) => {
  const baseUrl = process.env.OGP_URL;
  const tags = generateJoinedTagsString(post.tags);
  return `${baseUrl}/api/og/${tags}/?title=${post.title}&body=${post.excerpt}&color=${generateColor(
    post.color,
  )}`;
};

export const generateOgImageUrlByNotionAPI = (post: NotionAPIPost) => {
  const baseUrl = process.env.OGP_URL;
  const tags = generateJoinedTagsString(post.tags);
  const body = 'Notionからの投稿です。';
  return `${baseUrl}/api/og/${tags}/?title=${post.title}&body=${body}&color=${generateColor(
    post.colorCode,
  )}`;
};

export const divideTagsToList = (tags: string) => {
  return tags.split(',');
};

function generateJoinedTagsString(tags: string[]) {
  return tags.join('/');
}

function generateColor(colorCode: string) {
  return colorCode.replace(/#/, '');
}
