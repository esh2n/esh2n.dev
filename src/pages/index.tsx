import { NextPage } from 'next';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import Image from 'next/image';
import logo from '/public/images/blog_dev.png';
import ScrollIcon from '@components/ScrollIcon';
import TextLoop from 'react-text-loop';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const sectionBase = css`
  height: 100vh;
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
const About = styled.article`
  ${sectionBase}
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2e343f;
  color: #fff;
`;
const Home: NextPage = () => {
  return (
    <>
      <HeroSection />
      <About id="about">WIP</About>
    </>
  );
};

export default Home;

const HeroSection = () => {
  const roles = ['Frontend💻', 'Backend🌐', 'NativeApp📱'];
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
