import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import { NavLink, useParams } from 'react-router-dom'
import { Home, Logout } from '@mui/icons-material';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

interface ListItemLinkProps {
  text: string;
  icon?: React.ReactElement;
  to: string;
}

function isActive(to: string) {
  return location.pathname === to;
}


function ListItemLink({ text, icon, to }: ListItemLinkProps) {
  const { logout } = useAuth();
  const params = useParams();

  const path = params.id?.split("/").pop();

  useEffect(() => {
    if (path == '/login') {
      logout();
    }
  }, [path]);

  return (
    <>
      <NavLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem key={text} disablePadding sx={isActive(to) ? {bgcolor:"#e0e0e0"} : {}}>
          <ListItemButton>
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      </NavLink>
    </>
  )
}

export default function Layout({ children }: Props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
            <ListItemLink text="Home" icon={<Home/>} to="/" />
            <ListItemLink text="Question 1" icon={<LooksOneIcon/>} to="/question1" />
            <ListItemLink text="Question 2" icon={<LooksTwoIcon/>} to="/question2" />
            <ListItemLink text="Question 3" icon={<Looks3Icon/>} to="/question3" />
            <ListItemLink text="Question 4" icon={<Looks4Icon/>} to="/question4" />
            <ListItemLink text="Log out" icon={<Logout/>} to="/login" />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: `calc(100% - ${drawerWidth}px)`, height: '100vh' }}
      >
        {children}
      </Box>
    </Box>
  );
}
