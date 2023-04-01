import { NotionAPIPost, NotionAPIPosts, NotionPageObjectResponse } from 'types';
import { getDatabaseContents } from './databases';
import { toNotionAPIPost } from './meta';

export async function getAllNotionAPIPosts(): Promise<NotionAPIPosts> {
  const { results } = await getDatabaseContents({
    database_id: process.env.NOTION_BLOG_DATABASE_ID || '',
    page_size: 5,
    sorts: [
      {
        property: 'PublishedAt',
        direction: 'descending',
      },
    ],
    filter: {
      and: [
        {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        {
          property: 'PublishedAt',
          date: {
            is_not_empty: true,
          },
        },
      ],
    },
  });

  const notionAPIposts: NotionAPIPost[] = [];

  results.forEach((r: NotionPageObjectResponse) => {
    notionAPIposts.push(toNotionAPIPost(r));
  });

  return notionAPIposts;
}
