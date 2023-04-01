import Link from 'next/link';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { getDatabaseContents } from '@lib/notion-api/databases';
import { toNotionAPIPost } from '@lib/notion-api/meta';
import { notionAPIState } from '@atoms/blog';
import { getDateStr } from '@lib/blog-helpers';
import PostCard from '@components/blog-layouts/post-card';
import { NotionAPIPost, NotionAPIPosts, NotionPageObjectResponse } from 'types';

const StyledPostsWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 30px;
  padding: 25px;
  max-width: 1200px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const getStaticProps = async () => {
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

  return {
    props: {
      posts: notionAPIposts,
    },
    revalidate: 60 * 60 * 24, // 1日
  };
};

type Props = {
  posts: NotionAPIPost[];
};

const Home: NextPage<Props> = ({ posts }) => {
  const [notionAPIData, setNotionAPIData] = useRecoilState(notionAPIState);
  const notionPosts = useMemo(() => notionAPIData.posts, [notionAPIData.posts]) ?? posts;
  return (
    <>
      {
        <StyledPostsWrapper>
          {notionPosts.map((post: NotionAPIPost) => {
            return (
              <div key={post.id}>
                <Link as={`/notion/${post.id}`} href="/notion/[slug]">
                  <a>
                    <PostCard
                      title={post.title}
                      emoji={post.icon}
                      date={getDateStr(post.date)}
                      category={'NOTION'}
                      color={post.colorCode}
                      tags={post.tags}
                    />
                  </a>
                </Link>
              </div>
            );
          })}
        </StyledPostsWrapper>
      }
    </>
  );
};

export default Home;
