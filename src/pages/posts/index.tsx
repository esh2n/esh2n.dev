import React, { useEffect } from 'react';
import { getAllPosts } from '../../lib/getPosts';
import { Post as PostModel } from 'types';
import Link from 'next/link';

interface Props {
  allPosts: PostModel[];
}

const Posts = ({ allPosts }: Props) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  useEffect(() => {
    import('@okra-ui/gradient-text');
  }, []);
  return (
    <div>
      <gradient-text text="キラキラブログ一覧" />
      {morePosts.length > 0 && (
        <div>
          {allPosts.map((post) => (
            <div>
              <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                <a className="hover:underline">{post.title}</a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);

  return {
    props: { allPosts },
  };
}
