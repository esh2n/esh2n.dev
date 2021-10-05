import { NextPage } from 'next';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Image from 'next/image';
import logo from '/public/images/blog_dev.png';
import ScrollIcon from '@components/ScrollIcon';
import TextLoop from 'react-text-loop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TwitterIcon = () => <FontAwesomeIcon icon={faTwitter} size="lg" />;
const GithubIcon = () => <FontAwesomeIcon icon={faGithub} size="lg" />;

const sectionBase = css`
  width: 100vw;
`;

const Hero = styled.article`
  ${sectionBase}
  height: calc(100vh - 150px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4c5464;
  img {
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.6));
    width: 65vw;
    @media (min-width: 900px) {
      width: 580px;
    }
  }
  .text-loop {
    filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.6));
    &__text {
      width: 65vw;
      div {
        font-weight: bold;
        color: #fff;
        font-size: calc(100vw / 30);
        letter-spacing: 0.07em;
      }

      @media (min-width: 900px) {
        div {
          font-size: 30px;
          letter-spacing: 0.1em;
        }

        width: 580px;
      }
    }
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  );
};

export default Home;

const HeroSection = () => {
  const roles = ['Web Frontend💻', 'Web Backend🌐', 'iOS / Android📱'];
  return (
    <Hero style={{ position: 'relative' }}>
      <Box
        className="text-loop"
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Image src={logo} />
        <Box className="text-loop__text" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            component="div"
            sx={{
              marginTop: '48px',
            }}
          >
            As a &lt;
          </Typography>
          <TextLoop interval={10000}>
            {roles.map((text) => (
              <Typography
                component="div"
                sx={{
                  marginTop: '48px',
                  padding: '0 4px',
                }}
              >
                <>{text}</>
              </Typography>
            ))}
          </TextLoop>
          <Typography
            component="div"
            sx={{
              marginTop: '48px',
            }}
          >
            &gt; Engineer.
          </Typography>
        </Box>
      </Box>
      <ScrollIcon to="about" />
    </Hero>
  );
};

const About = styled.article`
  ${sectionBase}
  display: flex;
  padding: 50px 16px 25px 16px;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2e343f;
  color: #fff;
  @media (min-width: 650px) {
    flex-direction: row;
    padding: 150px 0 100px 0;
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
  &.scrolled {
    position: sticky;
    right: 0;
    top: 96px;
  }
`;

const AboutSection = () => {
  return (
    <About id="about" style={{ position: 'relative' }}>
      <InnerProfile />
      <Spacer />
      <RightProfile />
    </About>
  );
};

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
