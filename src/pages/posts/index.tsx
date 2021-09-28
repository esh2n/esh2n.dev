import Link from 'next/link';
import { useEffect } from 'react';
import { Post as PostModel } from 'types';
import styled from '@emotion/styled';
import { getAllPosts } from '@lib/markdown/getPosts';

interface Props {
  allPosts: PostModel[];
}

const StyledFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 30px;
  padding: 25px;
  a {
    font-size: 16px;
    color: #333333;
  }
`;

const Posts = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  useEffect(() => {
    import('@okra-ui/gradient-text');
  }, []);
  return (
    <StyledFlexWrapper>
      <gradient-text text="キラキラブログ一覧" />
      {morePosts.length > 0 && (
        <div>
          {allPosts.map((post, index) => (
            <div key={index}>
              <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                <a className="hover:underline">
                  {post.emoji}
                  {'　'}
                  <gradient-text text={post.title} />
                  {`(${post.date})`}
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </StyledFlexWrapper>
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