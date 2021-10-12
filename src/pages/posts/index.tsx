import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { MarkDownPost } from 'types';
import styled from '@emotion/styled';
import { getAllPosts } from '@lib/markdown/getPosts';
import PostCard from '@components/post-card';
import { useRecoilState } from 'recoil';
import { blogState, countState, markDownState } from '@atoms/blog';

interface Props {
  allPosts: MarkDownPost[];
}

const StyledPostsWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  justify-content: center;

  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 30px;
  padding: 25px;
  max-width: 1200px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const Posts = ({ allPosts }: Props) => {
  // const [blog, setBlog] = useRecoilState(blogState);
  const [md, setMd] = useRecoilState(markDownState);
  const markDownPosts = useMemo(() => md.posts, [md.posts]) ?? allPosts;

  const init = () => {
    setMd((state) => ({
      ...state,
      posts: allPosts,
    }));
  };
  useEffect(() => {
    init();
  }, [allPosts]);

  return (
    <>
      {
        <StyledPostsWrapper>
          {markDownPosts.map((post, index) => (
            <div key={index}>
              <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                <a className="hover:underline">
                  <PostCard
                    title={post.title}
                    emoji={post.emoji}
                    date={post.date.toString().split('-').join('/')}
                    category={post.categories[0]}
                    color={post.color}
                    tags={post.tags}
                  />
                </a>
              </Link>
            </div>
          ))}
        </StyledPostsWrapper>
      }
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
    'categories',
    'tags',
    'color',
  ]);

  return {
    props: { allPosts },
  };
}
