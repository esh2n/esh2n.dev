import styled from '@emotion/styled';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TwitterIcon = () => <FontAwesomeIcon icon={faTwitter} size="lg" />;
const GithubIcon = () => <FontAwesomeIcon icon={faGithub} size="lg" />;

const About = styled.article`
  width: 100vw;
  display: flex;
  padding: 10px 16px 25px 16px;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2e343f;
  color: #fff;
  @media (min-width: 650px) {
    flex-direction: row;
    padding: 50px 0 50px 0;
  }
  .inner-profile {
    width: 300px;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-right: 16px;
    transition: border-radius 300ms 0s ease;
    &:hover {
      border-radius: 10px;
    }
  }
  .flex {
    display: flex;
  }
  .col {
    flex-direction: column;
  }
  span {
    font-size: 20px;
  }
  .icon {
    font-size: 20px;
  }
  svg {
    color: #5e6572;
  }
  .light {
    font-weight: 500;
    font-size: 18px;
    color: #fff;
  }
  .super-light {
    font-size: 16px;
  }
`;

const AboutSection = () => {
  return (
    <Wrapper id="about">
      <WrapperInside>
        <p className="title">👦 About me.</p>
      </WrapperInside>
      <About style={{ position: 'relative' }}>
        <InnerProfile />
        <Spacer />
        <RightProfile />
      </About>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  padding: 100px 0px 50px 0px;
  margin: 0 auto;
  margin-top: -50px;
  .title {
    font-weight: 500;
    font-size: 20px;
    color: #fff;
    padding: 0px 16px 4px 0px;
    @media (max-width: 1200px) {
      margin-left: 16px;
    }
    border-bottom: 3px solid #4c5464;
    display: inline-block;
    background: linear-gradient(transparent 90%, #d1d17d 10%);
  }
`;

const WrapperInside = styled.div`
  margin: 0 auto;
  max-width: 1200px;
`;

const Spacer = styled.div`
  width: 8px;
  height: 6px;
  &.lg {
    height: 18px;
  }
`;

export const InnerProfile = () => {
  return (
    <div className="inner-profile">
      <div className="flex">
        <img src="https://avatars.githubusercontent.com/u/55518345?v=4" alt="avatar" />
        <div className="flex col">
          <span>Shunya ENDO</span>
          <Spacer />
          <div className="flex icon">
            <a href="https://twitter.com/esh2n">
              <TwitterIcon />
            </a>
            <Spacer />
            <a href="https://github.com/esh2n">
              <GithubIcon />
            </a>
          </div>
          <Spacer />
          <span className="super-light">he/him, 23 y.o.</span>
        </div>
      </div>
      <Spacer className="lg" />
      <span className="super-light">Web・ネイティブアプリエンジニア</span>

      <p className="light"></p>
      <span className="light">好奇心の赴くままに、広く深く学んでいきます。</span>
      <p className="light">
        Elm Deno Rust Flutter が特に好きでなにか作っては壊してを繰り返しています。
      </p>
    </div>
  );
};

export const RightProfile = () => {
  return (
    <div className="inner-profile">
      <span className="light">
        技術による問題解決に興味があり、ユーザーのニーズに最大限答えるものを大事にしたいという気持ちの反面、自分の好きなものを深めたいという技術者のジレンマを抱えています。
      </span>
      <p className="light">
        興味の幅はかなり広い方で、時間が許すのであれば何でも学びたいと思っていますが、現在はWebのフロントエンド、バックエンド、ネイティブアプリケーション開発に注力しております。
      </p>
    </div>
  );
};

export default AboutSection;
