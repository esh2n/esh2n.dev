import { useEffect } from 'react';
import styled from '@emotion/styled';
interface Props {
  html: string;
  coverImage: string;
}
const StyledPostBodyWrapper = styled.article`
  grid-area: post-body;
  background-color: #f5f5f5;
  border-radius: 20px;
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.1));
  width: 100%;
  display: block;
  div {
    text-align: center;
  }
  img {
    width: 75%;
    padding-top: 40px;
  }
`;
const PostBody = ({ html, coverImage }: Props) => {
  useEffect(() => {
    import('@okra-ui/string-to-html');
  });
  return (
    <StyledPostBodyWrapper>
      <div>
        <img src={coverImage} />
      </div>
      <string-to-html stringifiedHTML={html} />
    </StyledPostBodyWrapper>
  );
};

export default PostBody;
