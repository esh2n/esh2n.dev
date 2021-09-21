import { Post } from 'types';

export default function generateOgImageUrl(post: Post) {
  const baseUrl = process.env.OGP_URL;
  const tags = generateJoinedTagsString(post.tags);
  return `${baseUrl}/api/og/${tags}/?title=${post.title}&body=${post.excerpt}&color=${generateColor(
    post.color,
  )}`;
}

function generateJoinedTagsString(tags: string[]) {
  return tags.join('/');
}

function generateColor(colorCode: string) {
  return colorCode.replace(/#/, '');
}
