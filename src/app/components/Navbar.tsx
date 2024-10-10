import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Stack} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { UserButton } from '@clerk/nextjs';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: '#B37238', height: 60}} >
        <Toolbar sx={{alignItems: "center", justifyContent: "space-between"}} >
          <Button href="/home" color="inherit">Home</Button>
          <Stack direction="row">
            <Button href="/contact" color="inherit">Contact</Button>
            <UserButton />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
