"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Oooh_Baby } from "next/font/google";
import { Grid, Box, Typography, Button, Stack, Modal, TextField, FormControlLabel, Checkbox } from "@mui/material";
import Entry from "./entry";
import Navbar from '../components/Navbar';

const oooh_baby = Oooh_Baby({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FDEDD6',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Page() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#3D5926' }}>
            <Navbar />
            <Typography
                style={{
                    fontFamily: oooh_baby.style.fontFamily,
                    fontSize: '60px',
                    color: '#FDEDD6',
                    textAlign: 'center',
                    marginTop: '7px',
                }}
            >
                Home
            </Typography>
            <Grid container spacing={2} padding={1} sx={{ height: '100%' }}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box 
                        sx={{
                            marginLeft: '40px',
                            borderRadius: '8px',
                            backgroundColor: '#FDEDD6',
                            color: 'black',
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '350px',
                            border: '3px solid #000',
                            padding: '16px'
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6" sx={{ marginLeft: '8px', marginTop: '8px', borderBottom: '0.15rem solid black'}}>Step 1: List of Ingredients</Typography>
                            <Button
                                sx={{ marginRight: '8px', marginTop: '8px', backgroundColor: '#B87333', color: 'white' }}
                                onClick={handleOpen}
                            >
                                ADD INGREDIENT
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography variant="h6" gutterBottom>New Ingredient</Typography>
                                    <TextField fullWidth label="Ingredient Name" variant="standard" />
                                    <TextField fullWidth sx={{ mt: 3 }} label="Quantity" variant="standard" />
                                    <TextField fullWidth sx={{ mt: 3 }} label="Purchase Date (mm/dd)" variant="standard" />
                                </Box>
                            </Modal>
                        </Stack>
                        <Box
                            sx={{
                                minHeight: 350,
                                overflow: 'auto',
                                flexGrow: 1,
                                padding: '16px'
                            }}
                        >
                            <Entry />
                            <Entry />
                            <Entry />
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box 
                        sx={{
                            marginRight: '40px',
                            borderRadius: '8px',
                            backgroundColor: '#FDEDD6',
                            color: 'black',
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '350px',
                            border: '3px solid #000',
                            padding: '16px'
                        }}
                    >
                        <Typography variant="h6" sx={{ marginLeft: '8px', marginTop: '8px', borderBottom: '0.15rem solid black', width:'17rem' }}>Step 2: Spices & Seasonings</Typography>
                        <Box sx={{ minHeight: 350, overflow: 'auto', flexGrow: 1, padding: '16px' }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={3}>
                                    <Stack>
                                        <FormControlLabel control={<Checkbox />} label="Salt" />
                                        <FormControlLabel control={<Checkbox />} label="Black Pepper" />
                                        <FormControlLabel control={<Checkbox />} label="Garlic Powder" />
                                        <FormControlLabel control={<Checkbox />} label="Onion Powder" />
                                        <FormControlLabel control={<Checkbox />} label="Paprika" />
                                        <FormControlLabel control={<Checkbox />} label="Chili Powder" />
                                        <FormControlLabel control={<Checkbox />} label="Cumin" />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Stack>
                                        <FormControlLabel control={<Checkbox />} label="Basil" />
                                        <FormControlLabel control={<Checkbox />} label="Thyme" />
                                        <FormControlLabel control={<Checkbox />} label="Rosemary" />
                                        <FormControlLabel control={<Checkbox />} label="Cayenne Pepper" />
                                        <FormControlLabel control={<Checkbox />} label="Turmeric" />
                                        <FormControlLabel control={<Checkbox />} label="Coriander" />
                                        <FormControlLabel control={<Checkbox />} label="Parsley" />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Stack>
                                        <FormControlLabel control={<Checkbox />} label="Cinnamon" />
                                        <FormControlLabel control={<Checkbox />} label="Nutmeg" />
                                        <FormControlLabel control={<Checkbox />} label="Red Pepper Flakes" />
                                        <FormControlLabel control={<Checkbox />} label="Bay Leaves" />
                                        <FormControlLabel control={<Checkbox />} label="Cardamom" />
                                        <FormControlLabel control={<Checkbox />} label="Sage" />
                                        <FormControlLabel control={<Checkbox />} label="Dill" />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Stack>
                                        <FormControlLabel control={<Checkbox />} label="Cloves" />
                                        <FormControlLabel control={<Checkbox />} label="Fennel Seeds" />
                                        <FormControlLabel control={<Checkbox />} label="Allspice" />
                                        <FormControlLabel control={<Checkbox />} label="Curry Powder" />
                                        <FormControlLabel control={<Checkbox />} label="Tarragon" />
                                        <FormControlLabel control={<Checkbox />} label="White Pepper" />
                                        <FormControlLabel control={<Checkbox />} label="Saffron" />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Stack direction="row" justifyContent="space-evenly" spacing={1}>
                <Link href="/generate-recipes">
                    <Button sx={{ marginRight: '8px', marginTop: '8px', backgroundColor: '#B87333', color: 'white'}}>
                        Step 3
                    </Button>
                </Link>
            </Stack>
        </div>
    );
}
