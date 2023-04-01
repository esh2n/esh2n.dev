import styled from '@emotion/styled';

export default function Footer() {
  return (
    <Wrapper>
      <footer>
        <p className="light">esh2n.dev ©2021-2023</p>
      </footer>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  margin-top: auto;
  .light {
    font-weight: 500;
    font-size: 20px;
    color: #fff;
  }

  background-color: #4c5464;
  border-top: 20px solid #2e343f;
`;
