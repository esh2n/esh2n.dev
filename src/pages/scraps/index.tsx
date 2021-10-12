import Link from 'next/link';

import blogStyles from '../../styles/blog.module.scss';

import { getBlogLink, getDateStr, postIsPublished } from '../../lib/blog-helpers';
import getNotionUsers from '../../lib/notion/getNotionUsers';
import getBlogIndex from '../../lib/notion/getBlogIndex';
import { NotionPost, NotionPosts } from 'types';
import styled from '@emotion/styled';
import PostCard from '@components/post-card';
import { useRecoilState } from 'recoil';
import { blogState, notionState } from '@atoms/blog';
import { useEffect, useMemo } from 'react';
import { divideTagsToList } from '@lib/ogp/generateOgImageUrl';

export async function getStaticProps() {
  const postsTable = await getBlogIndex();

  const authorsToGet: Set<string> = new Set();
  const posts: NotionPosts = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug];
      if (!postIsPublished(post)) {
        return null;
      }
      post.Authors = post.Authors || [];
      for (const author of post.Authors) {
        authorsToGet.add(author);
      }
      return post;
    })
    .filter(Boolean);

  const { users } = await getNotionUsers([...authorsToGet]);

  posts.map((post: NotionPost) => {
    post.Authors = post.Authors.map((id) => users[id].full_name);
  });

  posts.sort((post1: NotionPost, post2: NotionPost) =>
    new Date(post1.Date) > new Date(post2.Date) ? -1 : 1,
  );
  return {
    props: {
      posts,
    },
    revalidate: 600,
  };
}

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

interface Props {
  posts?: NotionPosts;
}
const Index = ({ posts = [] }: Props) => {
  // const [blog, setBlog] = useRecoilState(blogState);
  const [notion, setNotion] = useRecoilState(notionState);
  const notionPosts = useMemo(() => notion.posts, [notion.posts]) ?? posts;

  const init = () => {
    setNotion((state) => ({
      ...state,
      posts: posts,
    }));
  };
  useEffect(() => {
    init();
  }, [posts]);

  return (
    <>
      <StyledPostsWrapper>
        {notionPosts.map((post: NotionPost) => {
          return (
            <div key={post.Slug}>
              {!post.Published && <span className={blogStyles.draftBadge}>Draft</span>}
              <Link href="/scraps/[slug]" as={getBlogLink(post.Slug)}>
                <a>
                  <PostCard
                    title={post.Page}
                    emoji={post.Emoji}
                    date={getDateStr(post.Date)}
                    category={'NOTION'}
                    color={post.ColorCode}
                    tags={divideTagsToList(post.Tag)}
                  />
                </a>
              </Link>
            </div>
          );
        })}
      </StyledPostsWrapper>
    </>
  );
};

export default Index;
