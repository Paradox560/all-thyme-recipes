import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { UserButton } from '@clerk/nextjs';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: '#B37238', height: 60}} >
        <Toolbar sx={{alignItems: "center", justifyContent: "space-between"}} >
          <Button href="/home" color="inherit">Home</Button>
          <UserButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
