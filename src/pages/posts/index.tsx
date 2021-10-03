import Link from 'next/link';
import { useEffect } from 'react';
import { Post as PostModel } from 'types';
import styled from '@emotion/styled';
import { getAllPosts } from '@lib/markdown/getPosts';
import PostCard from '@components/post-card';

interface Props {
  allPosts: PostModel[];
}

const StyledPostsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 30px;
  padding: 25px;
`;

const Posts = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  useEffect(() => {
    import('@okra-ui/gradient-text');
  }, []);
  return (
    <>
      {morePosts.length > 0 && (
        <StyledPostsWrapper>
          {allPosts.map((post, index) => (
            <div key={index}>
              <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                <a className="hover:underline">
                  <PostCard
                    title={post.title}
                    emoji={post.emoji}
                    date={post.date.toString().split('-').join('/')}
                  />
                </a>
              </Link>
            </div>
          ))}
        </StyledPostsWrapper>
      )}
    </>
  );
};

export default Posts;

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'emoji',
  ]);

  return {
    props: { allPosts },
  };
}
