import { NextPage } from 'next';
import { isMarkDownPost, MarkDownPosts, NotionPost, NotionPosts, Posts } from 'types';
import { getDateNum, getDateNumByMd, postIsPublished } from '@lib/blog-helpers';
import getBlogIndex from '@lib/notion/getBlogIndex';
import getNotionUsers from '@lib/notion/getNotionUsers';
import { getAllPosts } from '@lib/markdown/getPosts';
import HeroSection from '@components/sections/hero';
import AboutSection from '@components/sections/about';
import PostsSection from '@components/sections/posts';

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
  const notionPostsTable = await getBlogIndex();
  const authorsToGet: Set<string> = new Set();
  const notionPosts: NotionPosts = Object.keys(notionPostsTable)
    .map((slug) => {
      const notionPost = notionPostsTable[slug];
      if (!postIsPublished(notionPost)) {
        return null;
      }
      notionPost.Authors = notionPost.Authors || [];
      for (const author of notionPost.Authors) {
        authorsToGet.add(author);
      }
      return notionPost;
    })
    .filter(Boolean);

  const { users } = await getNotionUsers([...authorsToGet]);

  notionPosts.map((post: NotionPost) => {
    post.Authors = post.Authors.map((id) => users[id].full_name);
  });

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

  const posts: Posts = [...notionPosts, ...markdownPosts];
  posts.sort((prev, next) => {
    const isPrevMd = isMarkDownPost(prev);
    const isNextMd = isMarkDownPost(next);
    if (isPrevMd && isNextMd) {
      return getDateNumByMd(prev.date) > getDateNumByMd(next.date) ? -1 : 1;
    }
    if (!isPrevMd && !isNextMd) {
      return getDateNum(prev.Date) > getDateNum(next.Date) ? -1 : 1;
    }
    if (isPrevMd && !isNextMd) {
      return getDateNumByMd(prev.date) > getDateNum(next.Date) ? -1 : 1;
    }
    if (!isPrevMd && isNextMd) {
      return getDateNum(prev.Date) > getDateNumByMd(next.date) ? -1 : 1;
    }
  });

  return {
    props: { posts },
    revalidate: 600,
  };
}
