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
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@components/header';
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
  const router = useRouter();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(event.currentTarget);
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <>
      <Menu
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem
          onClick={() => {
            router.replace('/');
          }}
        >
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘Z
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.replace('/posts');
          }}
        >
          <ListItemIcon>
            <MenuBookIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Blog</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.replace('/scraps');
          }}
        >
          <ListItemIcon>
            <FeedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Notion</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘C
          </Typography>
        </MenuItem>
        <Divider />
        <Link href="https://github.com/esh2n">
          <MenuItem>
            <ListItemIcon>
              <GitHubIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>GitHub　　　</ListItemText>
          </MenuItem>
        </Link>
        <Link href="https://twitter.com/esh2n">
          <MenuItem>
            <ListItemIcon>
              <TwitterIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Twitter</ListItemText>
          </MenuItem>
        </Link>
      </Menu>
    </>
  );

  return (
    <>
      <UpperHeader />
      <AppBar position="sticky" color="inherit" className="appbar" elevation={trigger ? 4 : 0}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>{ToggleButtons()}</Box>
          <Box>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            ></IconButton>
          </Box>
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
  const path = `/${pathname.split('/')[1].trim()}`;
  const [alignment, setAlignment] = useState<string | null>(path);

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
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
        <ToggleButton value="/" aria-label="left aligned">
          <Link href="/">
            <a>
              <HomeIcon fontSize="small" />
              {renderText('/')}
            </a>
          </Link>
        </ToggleButton>
        <ToggleButton value="/posts" aria-label="centered">
          <Link href="/posts">
            <a>
              <MenuBookIcon fontSize="small" />
              {renderText('/posts')}
            </a>
          </Link>
        </ToggleButton>
        <ToggleButton value="/scraps" aria-label="right aligned">
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
