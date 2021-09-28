import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

interface Props {}
const StyledSideWrapper = styled.div`
  grid-area: side-profile;
  width: 300px;
  color: #333333;
  background-color: #f5f5f5;
  font-weight: 600;
  border-radius: 20px;
  height: 332px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.1));
  display: none;
  @media (min-width: 992px) {
    padding: 30px 20px;
    display: block;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-right: 16px;
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
    color: #595959;
  }
  .light {
    font-weight: 500;
    font-size: 18px;
    color: #595959;
  }
  .super-light {
    font-size: 16px;
  }
  &.scrolled {
    position: sticky;
    right: 0;
    top: 16px;
  }
`;

const TwitterIcon = () => <FontAwesomeIcon icon={faTwitter} size="lg" />;
const GithubIcon = () => <FontAwesomeIcon icon={faGithub} size="lg" />;

const Spacer = styled.div`
  width: 8px;
  height: 6px;
  &.lg {
    height: 18px;
  }
`;

const SideProfile = ({}: Props) => {
  const [scrolled, setScrolled] = React.useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 390) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });
  return (
    <StyledSideWrapper className={scrolled ? 'scrolled' : ''}>
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
          <span className="super-light">フロントエンジニア</span>
        </div>
      </div>
      <Spacer className="lg" />
      <span className="light">好奇心の赴くままに、広く深く学んでいきます。</span>
      <p className="light">
        Elm Deno Rust Flutter が特に好きでなにか作っては壊してを繰り返しています。
      </p>
    </StyledSideWrapper>
  );
};

export default SideProfile;
