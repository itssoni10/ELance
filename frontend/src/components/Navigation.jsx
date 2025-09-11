import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Badge,
  Fade,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Assessment,
  Timeline,
  Person,
  Upload,
  Logout,
  Home,
  Info,
  Search,
  Business,
  School,
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { authService } from '../services/AuthService';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { user, logout } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  const drawer = (
    <Box sx={{ 
      width: 280, 
      pt: 2, 
      background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)',
      height: '100%',
      color: 'white'
    }}>
      <Box sx={{ px: 3, pb: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          🚀 ELance
        </Typography>
      </Box>
      <List>
        <ListItem button component="a" href="/" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
          <ListItemIcon><Home sx={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {user ? (
          <>
            <ListItem button component="a" href="/dashboard" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemIcon><Dashboard sx={{ color: 'white' }} /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component="a" href="/skill-radar" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemIcon><Assessment sx={{ color: 'white' }} /></ListItemIcon>
              <ListItemText primary="Skill Radar" />
            </ListItem>
            <ListItem button component="a" href="/career-planner" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemIcon><Timeline sx={{ color: 'white' }} /></ListItemIcon>
              <ListItemText primary="Career Planner" />
            </ListItem>
            <ListItem button component="a" href="/resume" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemIcon><Upload sx={{ color: 'white' }} /></ListItemIcon>
              <ListItemText primary="Resume" />
            </ListItem>
            <ListItem button component="a" href="/userprofile" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemIcon><Person sx={{ color: 'white' }} /></ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button component="a" href="/aboutus" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemIcon><Info sx={{ color: 'white' }} /></ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component="a" href="/login" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemIcon><Person sx={{ color: 'white' }} /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component="a" href="/aboutus" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <ListItemIcon><Info sx={{ color: 'white' }} /></ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          background: 'rgba(15, 20, 25, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: scrollY > 50 ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              fontSize: '1.5rem',
              background: 'linear-gradient(45deg, #42a5f5 30%, #1976d2 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            🚀 ELance
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2, mr: 2, alignItems: 'center' }}>
              <Button color="inherit" href="/" sx={{ fontWeight: 600 }}>Home</Button>
              {user ? (
                <>
                  <Button color="inherit" href="/dashboard" sx={{ fontWeight: 600 }}>Dashboard</Button>
                  <Button color="inherit" href="/skill-radar" sx={{ fontWeight: 600 }}>Skill Radar</Button>
                  <Button color="inherit" href="/career-planner" sx={{ fontWeight: 600 }}>Career Planner</Button>
                  <Button color="inherit" href="/resume" sx={{ fontWeight: 600 }}>Resume</Button>
                  <Button color="inherit" href="/aboutus" sx={{ fontWeight: 600 }}>About Us</Button>
                </>
              ) : (
                <>
                  <Button color="inherit" href="/login" sx={{ fontWeight: 600 }}>Login</Button>
                  <Button color="inherit" href="/aboutus" sx={{ fontWeight: 600 }}>About Us</Button>
                </>
              )}
              <IconButton color="inherit">
                <Search />
              </IconButton>
            </Box>
          )}

          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}
                >
                  {user.username?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    background: 'rgba(15, 20, 25, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    mt: 1
                  }
                }}
              >
                <MenuItem onClick={handleMenuClose} sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <Person fontSize="small" sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary={user.username} secondary={user.email} />
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component="a" href="/userprofile" sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <Person fontSize="small" sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'white' }}>
                  <ListItemIcon>
                    <Logout fontSize="small" sx={{ color: 'white' }} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)',
            border: 'none'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation;
