import React, { useEffect } from 'react';
import styled from '@emotion/styled';
interface Props {
  html: string;
}
const StyledPostBodyWrapper = styled.article`
  background-color: #f5f5f5;
  border-radius: 20px;
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.6));
  width: calc(100% - 330px);
  @media (max-width: 992px) {
    width: 100%;
  }
`;
const PostBody = ({ html }: Props) => {
  useEffect(() => {
    import('@okra-ui/string-to-html');
  }, []);
  return (
    <StyledPostBodyWrapper>
      <string-to-html stringifiedHTML={html} />
    </StyledPostBodyWrapper>
  );
};

export default PostBody;
