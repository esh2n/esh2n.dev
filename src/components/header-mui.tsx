import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Divider,
  ListItemText,
  ListItemIcon,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useScrollTrigger,
} from '@mui/material';
import { useState } from 'react';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FeedIcon from '@mui/icons-material/Feed';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from '@emotion/styled';

interface Props {
  window?: () => Window;
}

const StyledImageWrapper = styled.img`
  height: 40px;
  margin: 16px 0;
`;

const UpperHeader = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StyledImageWrapper src="/images/blog_dev.png" />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default function Appbar(props: Props) {
  const { window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <>
      <UpperHeader />
      <AppBar position="sticky" color="inherit" className="appbar" elevation={trigger ? 4 : 0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>{ToggleButtons()}</Box>
          <Box></Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

const StyledToggleButtonWrapper = styled.div`
  a {
    display: flex;
    align-items: center;
  }
`;

function ToggleButtons() {
  const { pathname } = useRouter();
  const router = useRouter();
  const path = `/${pathname.split('/')[1].trim()}`;

  const [alignment, setAlignment] = useState<string | null>(path);
  const [isHome, setHome] = useState<boolean>(false);
  const [isPost, setPost] = useState<boolean>(false);
  const [isScrap, setScrap] = useState<boolean>(false);

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    switch (newAlignment) {
      case '/':
        setHome(true);
        setPost(false);
        setScrap(false);
        router.replace('/');
        break;
      case '/posts':
        setHome(false);
        setPost(true);
        setScrap(false);
        router.replace('/posts');
        break;
      case '/scraps':
        setHome(false);
        setPost(false);
        setScrap(true);
        router.replace('/scraps');
        break;
    }
    setAlignment(newAlignment);
  };

  const renderText = (path: string) => {
    return (
      <>
        {path === alignment ? (
          <Typography
            color="text.secondary"
            component="div"
            sx={{
              fontSize: '14px',
              color: 'white',
              verticalAlign: 'baseline',
              paddingLeft: '8px',
            }}
          >
            {handleStr(path.split('/')[1].toUpperCase())}
          </Typography>
        ) : (
          <></>
        )}
      </>
    );
  };

  const handleStr = (str: string) => {
    if (str == '') return 'HOME';
    if (str == 'POSTS') return 'BLOG';
    if (str == 'SCRAPS') return 'NOTION';
    return str;
  };

  return (
    <StyledToggleButtonWrapper>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={{ margin: '8px 0' }}
      >
        <ToggleButton value="/" aria-label="left aligned" selected={isHome}>
          <Link href="/">
            <a>
              <HomeIcon fontSize="small" />
              {renderText('/')}
            </a>
          </Link>
        </ToggleButton>
        <ToggleButton value="/posts" aria-label="centered" selected={isPost}>
          <Link href="/posts">
            <a>
              <MenuBookIcon fontSize="small" />
              {renderText('/posts')}
            </a>
          </Link>
        </ToggleButton>
        <ToggleButton value="/scraps" aria-label="right aligned" selected={isScrap}>
          <Link href="/scraps">
            <a>
              <FeedIcon fontSize="small" />
              {renderText('/scraps')}
            </a>
          </Link>
        </ToggleButton>
      </ToggleButtonGroup>
    </StyledToggleButtonWrapper>
  );
}
