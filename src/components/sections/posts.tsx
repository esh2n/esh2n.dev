import styled from '@emotion/styled';
import { Posts, Post, isMarkDownPost } from 'types';
import Link from 'next/link';
import PostCard from '@components/blog-layouts/post-card';
import { getBlogLink, getDateStr } from '@lib/blog-helpers';
import { divideTagsToList } from '@lib/ogp/generateOgImageUrl';

interface Props {
  posts: Posts;
}

const PostsSection = ({ posts }: Props) => {
  return (
    <Wrapper>
      <WrapperInside>
        <p className="light">📝 Recent Posts.</p>
        <StyledPostsWrapper>
          {posts.map((post: Post, index) => {
            const isMd = isMarkDownPost(post);
            return isMd ? (
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
            ) : (
              <div key={post.Slug}>
                <Link href="/scraps/[slug]" as={getBlogLink(post.Slug)}>
                  <a>
                    <PostCard
                      title={post.Page}
                      emoji={post.Emoji}
                      date={getDateStr(post.Date)}
                      category={'NOTION'}
                      color={post.ColorCode}
                      tags={divideTagsToList(post.Tag)}
                    />
                  </a>
                </Link>
              </div>
            );
          })}
        </StyledPostsWrapper>
      </WrapperInside>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background-color: #4c5464;
  padding: 50px 0px 50px 0px;

  .light {
    font-weight: 500;
    font-size: 20px;
    color: #fff;
    padding: 0px 16px 4px 0px;
    @media (max-width: 1200px) {
      margin-left: 16px;
    }
    border-bottom: 3px solid #2e343f;
    display: inline-block;
    background: linear-gradient(transparent 90%, #d1d17d 10%);
  }
`;

const StyledPostsWrapper = styled.div`
  display: grid;
  margin: 0 auto;
  justify-content: center;
  background-color: #2e343f;
  border-radius: 20px;
  overflow-y: scroll;
  height: calc(550px);
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 30px;
  padding: 25px;
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.6);
`;

const WrapperInside = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export default PostsSection;
