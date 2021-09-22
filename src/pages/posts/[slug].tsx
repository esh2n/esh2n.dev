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

interface Props {
  post: PostModel;
  ogImageUrl: string;
}
const StyledWrapper = styled.article`
  @media (min-width: 992px) {
    padding: 25px 40px;
  }
  @media (min-width: 768px) {
    padding: 25px 40px;
  }
  padding: 25px;
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
          <StyledWrapper>
            <PostTitle title={post.title} date={post.date} emoji={post.emoji} />
            <Spacer />
            {/* <div>
              <h1>{post.title}</h1>
              <p>createdAt: {post.date}</p>
              <p>author: {post.author.name}</p>
            </div> */}
            <PostBody html={post.content} />
          </StyledWrapper>
        </>
      )}
    </div>
  );
}

const Spacer = styled.div`
  padding: 24px;
`;

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
