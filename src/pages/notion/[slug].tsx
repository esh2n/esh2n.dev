import styled from '@emotion/styled';
import { NotionPageObjectResponse, NotionAPIPost } from 'types';
import SideProfile from '@components/blog-layouts/side-profile';
import { getDatabaseContentsAll } from '@lib/notion-api/databases';
import { getPage } from '@lib/notion-api/page';
import { toNotionAPIPost } from '@lib/notion-api/meta';
import { getMarkdownAllInBlock } from '@lib/notion-api/block';
import NextHead from 'next/head';
import PostTitle from '@components/blog-layouts/post-title';
import PostBody from '@components/blog-layouts/post-body';
import { generateOgImageUrlByNotionAPI } from '@lib/ogp/generateOgImageUrl';
import markdownToHtml from '@lib/markdown/markdownToHtml';

type Props = {
  post: NotionAPIPost;
  ogImageUrl: string;
};

const StyledGridWrapper = styled.article`
  display: grid;
  justify-content: center;
  row-gap: 26px;
  grid-template-areas:
    'post-title'
    'post-body';
  grid-template-columns: minmax(200px, 790px);
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

export async function getStaticProps({ params }) {
  const page_id = params?.slug as string;
  const page = (await getPage(page_id)) as NotionPageObjectResponse;
  const md = await getMarkdownAllInBlock(page_id);
  const content = await markdownToHtml(md);

  const post: NotionAPIPost = {
    ...toNotionAPIPost(page),
    content,
  };
  const ogImageUrl = generateOgImageUrlByNotionAPI(post);

  return {
    props: {
      post,
      ogImageUrl,
    },
    revalidate: 60 * 60 * 3, // 3時間
  };
}

export async function getStaticPaths() {
  const postsArray = await getDatabaseContentsAll({
    database_id: process.env.NOTION_BLOG_DATABASE_ID || '',
    sorts: [
      {
        property: 'PublishedAt',
        direction: 'descending',
      },
    ],
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
  });

  const posts = postsArray.flat() as NotionPageObjectResponse[];
  const paths = posts.map((post) => {
    return { params: { slug: toNotionAPIPost(post).id } };
  });

  return {
    paths,
    fallback: 'blocking', // HTMLを生成しない
  };
}

const RenderPost = ({ post, ogImageUrl }: Props) => {
  return (
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
          emoji={post.icon}
        />
        <SideProfile />
        <PostBody html={post.content} coverImage={ogImageUrl} />
      </StyledGridWrapper>
    </>
  );
};

export default RenderPost;
