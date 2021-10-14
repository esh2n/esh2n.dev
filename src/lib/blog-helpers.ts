export const getBlogLink = (slug: string) => {
  return `/scraps/${slug}`;
};

export const getDateStr = (date) => {
  return new Date(date).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const getDateStrByMd = (date) => {
  return new Date(date.toString().split('-').join('/')).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const getDateNum = (date) => {
  return new Date(date).getTime();
};

export const getDateNumByMd = (date) => {
  return new Date(date.toString().split('-').join('/')).getTime();
};

export const postIsPublished = (post: any) => {
  return post.Published === 'Yes';
};

export const normalizeSlug = (slug) => {
  if (typeof slug !== 'string') return slug;

  let startingSlash = slug.startsWith('/');
  let endingSlash = slug.endsWith('/');

  if (startingSlash) {
    slug = slug.substr(1);
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1);
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug;
};
