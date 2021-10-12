import { NotionPost, MarkDownPost } from 'types';

export const generateOgImageUrlByPost = (post: MarkDownPost) => {
  const baseUrl = process.env.OGP_URL;
  const tags = generateJoinedTagsString(post.tags);
  return `${baseUrl}/api/og/${tags}/?title=${post.title}&body=${post.excerpt}&color=${generateColor(
    post.color,
  )}`;
};

export const generateOgImageUrlByNotion = (post: NotionPost) => {
  const baseUrl = process.env.OGP_URL;
  const tags = generateJoinedTagsString(divideTagsToList(post.Tag));
  const body = 'Notionからのメモ';
  return `${baseUrl}/api/og/${tags}/?title=${post.Page}&body=${body}&color=${generateColor(
    post.ColorCode,
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
