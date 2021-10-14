import styled from '@emotion/styled';

export default function Footer() {
  return (
    <Wrapper>
      <footer>
        <p className="light">esh2n.dev ©2021</p>
      </footer>
    </Wrapper>
  );
}

const Wrapper = styled.article`
  /* padding: 100px 0px 50px 0px;
  margin: 0 auto;
  margin-top: -50px; */
  .light {
    font-weight: 500;
    font-size: 20px;
    color: #fff;
    /* padding: 0px 16px 4px 0px; */
  }

  background-color: #4c5464;
  border-top: 20px solid #2e343f;
`;
