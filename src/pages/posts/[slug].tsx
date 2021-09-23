import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getPostBySlug, getAllPosts } from '../../lib/getPosts';
import NextHead from 'next/head';
import markdownToHtml from '../../lib/markdownToHtml';
import PostBody from '@components/post-body';
import { Post as PostModel } from 'types';
import generateOgImageUrl from 'lib/generateOgImageUrl';
import styled from '@emotion/styled';
import PostTitle from '../../components/post-title';
import SideProfile from '../../components/side-profile';

interface Props {
  post: PostModel;
  ogImageUrl: string;
}

const StyledGridWrapper = styled.article`
  display: grid;
  justify-content: center;
  padding: 25px;
  row-gap: 36px;
  column-gap: 36px;
  grid-template-areas:
    'post-title'
    'post-body';
  grid-template-columns: minmax(200px, 790px);

  @media (min-width: 768px) {
    padding: 25px 40px;
  }
  @media (min-width: 992px) {
    grid-template-columns: minmax(200px, 790px) 300px;
    grid-template-areas:
      'post-title post-title'
      'post-body side-profile';
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
            <PostTitle title={post.title} date={post.date} emoji={post.emoji} />
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
  const ogImageUrl = generateOgImageUrl(post);
  return {
    props: {
      post: {
        ...post,
        content,
      },
      ogImageUrl,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
}
