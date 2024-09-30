import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Jost, Oooh_Baby } from 'next/font/google';
import { UserButton } from '@clerk/nextjs';

const oooh_baby = Oooh_Baby({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

const jost = Jost({
  weight: ['300','400','500','600'],
  subsets: ['latin'],
})


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: '#B37238', height: 60}} >
        <Toolbar sx={{alignItems: "center", justifyContent: "space-between"}} >
          <Button style={{fontFamily: jost.style.fontFamily, fontSize: "1.45rem", fontWeight: 400}} href="/home" color="inherit">Home</Button>
          <UserButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
