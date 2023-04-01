import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionAPIPost, NotionBlockObjectResponse, NotionPageObjectResponse } from 'types';

/**
 * NotionPageObjectResponseをNotionAPIPostに変換
 */
export const toNotionAPIPost = (page: NotionPageObjectResponse): NotionAPIPost => {
  const { id, icon, properties, last_edited_time } = page;
  // if (icon !== null && icon.type !== 'emoji') throw new Error('Icon is not emoji');
  if (properties.Page.type !== 'title') throw new Error('Title is not title');
  if (properties.Category.type !== 'select') throw new Error('Category is not select');
  if (properties.PublishedAt.type !== 'date') throw new Error('Date is not date');
  if (properties.Tags.type !== 'multi_select') throw new Error('Tags is not multi_select');
  if (properties.Slug.type !== 'rich_text') throw new Error('Tags is not multi_select');
  if (properties.ColorCode.type !== 'rich_text') throw new Error('Tags is not multi_select');

  const title = properties.Page.title[0].plain_text;
  const emoji = icon.type == 'emoji' ? icon.emoji : '📄';
  const category = properties.Category.select || {
    id: '',
    name: 'カテゴリなし',
    color: 'default',
  };
  const date = properties.PublishedAt.date?.start || '日付なし';
  const updatedAt = last_edited_time.substring(0, 10);
  const tags = properties.Tags.multi_select.map((t) => t.name);
  const slug = properties.Slug.rich_text[0].plain_text;
  const colorCode = properties.ColorCode.rich_text[0].plain_text;

  return {
    id,
    icon: emoji,
    title,
    category,
    date,
    slug,
    colorCode,
    updatedAt,
    tags,
  };
};

/**
 * NotionのPageのchildrenをMeta description用のテキストに変換
 */

export const toMetaDescription = (children: NotionBlockObjectResponse[]): string => {
  let allText = '';
  let i = 0;
  do {
    const child = children[i];
    const type = child.type;
    if (type === 'code' || type === 'unsupported') {
      i++;
      continue;
    }
    const rich_text = child[type]?.rich_text;
    if (rich_text && rich_text.length > 0) {
      const plainText = rich_text.map((text: { plain_text: string }) => text.plain_text).join('');

      allText = allText + plainText;
    }
    i++;
  } while (i < children.length && allText.length < 70);

  return `${allText}...`;
};
