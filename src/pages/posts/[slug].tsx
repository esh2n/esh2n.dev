import ErrorPage from 'next/error';
import NextHead from 'next/head';
import { MarkDownPost } from 'types';
import { useRouter } from 'next/router';
//
import { getPostBySlug, getAllPosts } from '@lib/markdown/getPosts';
import markdownToHtml from '@lib/markdown/markdownToHtml';
import { generateOgImageUrlByPost } from '@lib/ogp/generateOgImageUrl';
//
import styled from '@emotion/styled';
import PostTitle from '@components/blog-layouts/post-title';
import PostBody from '@components/blog-layouts/post-body';
import SideProfile from '@components/blog-layouts/side-profile';

interface Props {
  post: MarkDownPost;
  ogImageUrl: string;
}

const StyledGridWrapper = styled.article`
  display: grid;
  justify-content: center;
  row-gap: 26px;
  grid-template-areas:
    'post-title'
    'post-body';
  grid-template-columns: minmax(200px, 790px);
  padding: 10px 0;
  @media (min-width: 500px) {
    padding: 25px;
  }
  @media (min-width: 768px) {
    padding: 25px 40px;
  }
  @media (min-width: 992px) {
    grid-template-columns: minmax(200px, 790px) 300px;
    grid-template-areas:
      'post-title post-title'
      'post-body side-profile';
    row-gap: 36px;
    column-gap: 36px;
  }
`;
export default function Post({ post, ogImageUrl }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div>
      {router.isFallback ? (
        <>Loading…</>
      ) : (
        <>
          <NextHead>
            <title>{post.title} | esh2n.dev</title>
            <meta property="og:image" content={ogImageUrl} />
            <meta name="twitter:image" content={ogImageUrl} />
          </NextHead>
          <StyledGridWrapper>
            <PostTitle
              title={post.title}
              date={post.date.toString().split('-').join('/')}
              emoji={post.emoji}
            />
            <SideProfile />
            <PostBody html={post.content} coverImage={post.coverImage} />
          </StyledGridWrapper>
        </>
      )}
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
    'tags',
    'category',
    'excerpt',
    'color',
    'emoji',
  ]);
  const content = await markdownToHtml(post.content || '');
  const ogImageUrl = generateOgImageUrlByPost(post);
  return {
    props: {
      post: {
        ...post,
        content,
      },
      ogImageUrl,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
}
