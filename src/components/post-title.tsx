import React, { useEffect } from 'react';
import styled from '@emotion/styled';
interface Props {
  title: string;
  date: Date;
  emoji: string;
}
const StyledPostWrapper = styled.div`
  grid-area: post-title;
  color: #333333;
  background-color: #f5f5f5;
  font-weight: 600;
  border-radius: 20px;
  /* height: 232px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.1));
  padding: 25px;
  @media (min-width: 768px) {
    padding: 25px 40px;
    height: 332px;
  }
  picture {
    font-size: 76px;
  }
  div {
    @media (min-width: 768px) {
      font-size: 30px;
    }
    font-size: 20px;
    text-align: center;
  }
  p {
    margin-top: 2em;
    font-size: 14px;
  }
`;
const PostTitle = ({ title, date, emoji }: Props) => {
  return (
    <StyledPostWrapper>
      <picture>{emoji ?? '🔥'}</picture>
      <div>{title ?? ''}</div>
      <p>{date.toString().replace(/-/g, '.')}</p>
    </StyledPostWrapper>
  );
};

export default PostTitle;
