import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getPostBySlug, getAllPosts } from '../../lib/getPosts';
import Head from 'next/head';
import markdownToHtml from '../../lib/markdownToHtml';
import PostBody from '@components/post-body';
import { Post as PostModel } from 'types';
import generateOgImageUrl from 'lib/generateOgImageUrl';

interface Props {
  post: PostModel;
  ogImageUrl: string;
}
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
          <Head>
            <title>{post.title} | esh2n.dev</title>
            <meta property="og:image" content={ogImageUrl} />
          </Head>
          <div>
            <h1>{post.title}</h1>
            <p>createdAt: {post.date}</p>
            <p>author: {post.author.name}</p>
          </div>
          <PostBody html={post.content} />
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
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
