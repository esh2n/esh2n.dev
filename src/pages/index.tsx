import { isMarkDownPost, MarkDownPosts, NotionAPIPosts, Posts } from 'types';
import { getDateNum, getDateNumByMd, postIsPublished } from '@lib/blog-helpers';
import { getAllPosts } from '@lib/markdown/getPosts';
import HeroSection from '@components/sections/hero';
import AboutSection from '@components/sections/about';
import PostsSection from '@components/sections/posts';
import { getAllNotionAPIPosts } from '@lib/notion-api/getPosts';

interface Props {
  posts: Posts;
}

const Home = ({ posts }: Props) => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PostsSection posts={posts} />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const markdownPosts: MarkDownPosts = getAllPosts([
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

  const notionAPIPosts: NotionAPIPosts = await getAllNotionAPIPosts();

  const posts: Posts = [...markdownPosts, ...notionAPIPosts];
  posts.sort((prev, next) => {
    const isPrevMd = isMarkDownPost(prev);
    const isNextMd = isMarkDownPost(next);
    if (isPrevMd && isNextMd) {
      return getDateNumByMd(prev.date) > getDateNumByMd(next.date) ? -1 : 1;
    }
    if (!isPrevMd && !isNextMd) {
      return getDateNum(prev.date) > getDateNum(next.date) ? -1 : 1;
    }
    if (isPrevMd && !isNextMd) {
      return getDateNumByMd(prev.date) > getDateNum(next.date) ? -1 : 1;
    }
    if (!isPrevMd && isNextMd) {
      return getDateNum(prev.date) > getDateNumByMd(next.date) ? -1 : 1;
    }
  });

  return {
    props: { posts },
    revalidate: 600,
  };
}
