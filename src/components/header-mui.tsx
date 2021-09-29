import * as React from 'react';
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
  useScrollTrigger,
  Slide,
  CssBaseline,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FeedIcon from '@mui/icons-material/Feed';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import styled from '@emotion/styled';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useRouter } from 'next/router';
import Link from 'next/link';

const StyledWrapper = styled.div`
  .MuiMenu-root {
    background-color: #2e3440;
    background-image: url('https://images.unsplash.com/photo-1440688807730-73e4e2169fb8?format=auto&auto=compress&dpr=2&crop=entropy&fit=crop&w=1920&h=1282&q=80');
    background-size: cover;
    -webkit-filter: blur(0px);
    filter: blur(0px);
    color: #f5f5f5;
  }
`;

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
  });
};

// function HideOnScroll({ children, window }) {
//   const trigger = useScrollTrigger({
//     disableHysteresis: true,
//     threshold: 0,
//     target: window ? window() : undefined,
//   });

//   console.log(trigger);

//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

export default function PrimarySearchAppBar(props) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const router = useRouter();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <StyledWrapper>
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
    </StyledWrapper>
  );

  return (
    <>
      <AppBar position="sticky" color="inherit" className="appbar">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
}
