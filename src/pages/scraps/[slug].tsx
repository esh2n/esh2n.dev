import fetch from 'node-fetch';
import getPageData from '@lib/notion/getPageData';
import getBlogIndex from '@lib/notion/getBlogIndex';
import getNotionUsers from '@lib/notion/getNotionUsers';
import { getBlogLink, getDateStr } from '@lib/blog-helpers';
import NotionPostBody from '@components/notion-post';
import styled from '@emotion/styled';
import { Tweet, NotionPost } from 'types';
import SideProfile from '@components/side-profile';
import PostTitle from '@components/post-title';

type Props = {
  post?: NotionPost;
  redirect?: string;
  preview: boolean;
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

export async function getStaticProps({ params: { slug }, preview }) {
  const postsTable = await getBlogIndex();
  const post = postsTable[slug];

  if (!post || (post.Published !== 'Yes' && !preview)) {
    console.log(`Failed to find post for slug: ${slug}`);
    return {
      props: {
        redirect: '/scraps',
        preview: false,
      },
      revalidate: 5, // wait 5s as ssg
    };
  }
  const postData = await getPageData(post.id);
  post.content = postData.blocks;

  for (let i = 0; i < postData.blocks.length; i++) {
    const { value } = postData.blocks[i];
    const { type, properties } = value;
    if (type == 'tweet') {
      const src = properties.source[0][0];
      const tweetId = src.split('/')[5].split('?')[0];
      if (!tweetId) continue;

      try {
        const res = await fetch(`https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`);
        const json = (await res.json()) as Tweet;
        properties.html = json.html.split('<script')[0];
        post.hasTweet = true;
      } catch (_) {
        console.log(`Failed to get tweet embed for ${src}`);
      }
    }
  }

  const { users } = await getNotionUsers(post.Authors || []);
  post.Authors = Object.keys(users).map((id) => users[id].full_name);

  return {
    props: {
      post,
      preview: preview || false,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const postsTable = await getBlogIndex();
  return {
    paths: Object.keys(postsTable)
      .filter((post) => postsTable[post].Published === 'Yes')
      .map((slug) => getBlogLink(slug)),
    fallback: true,
  };
}

const RenderPost = ({ post, redirect, preview }: Props) => {
  const title = post.Page ?? '';
  const date = getDateStr(post.Date);
  const emoji = '📝';
  return (
    <StyledGridWrapper>
      <PostTitle title={title} date={date} emoji={emoji} />
      <NotionPostBody post={post} preview={preview} redirect={redirect} />
      <SideProfile />
    </StyledGridWrapper>
  );
};

export default RenderPost;
