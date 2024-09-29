"use client";

import { useState } from 'react';
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
        <div className="min-h-screen full-width bg-themeGreen">
            <Navbar />
            <Typography style={{ fontFamily: oooh_baby.style.fontFamily }} className="text-title text-themeCream text-center">Home</Typography>
            <Grid container spacing={2} sx={{ height: '100%' }}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box 
                        className="ml-10 rounded-md bg-themeCream text-black" 
                        sx={{ 
                            flexGrow: 1, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            minHeight: '350px', 
                            border: '3px solid #000',
                            borderRadius: '8px'
                        }}
                    >
                        <Stack direction="row" justifyContent={"space-between"}>
                            <Typography variant="h6" className="ml-2 mt-2">Step 1: List of Ingredients</Typography>
                            <Button className="mr-2 mt-2 bg-themeCopper text-white" onClick={handleOpen}>ADD INGREDIENT</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} className="text-black">
                                    <h1 className="text-add">New Ingredient</h1>
                                    <TextField id="standard-basic" label="Ingredient Name" variant="standard" />
                                    <TextField className="mt-3" id="standard-basic" label="Quantity" variant="standard" />
                                    <TextField className="mt-3" id="standard-basic" label="Purchase Date (mm/dd)" variant="standard" />
                                </Box>
                            </Modal>
                        </Stack>
                        <Box
                            className="p-2"
                            sx={{
                                minHeight: 350,
                                overflow: 'auto',
                                flexGrow: 1,
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
                        className="mr-10 rounded-md bg-themeCream text-black" 
                        sx={{ 
                            flexGrow: 1, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            minHeight: '350px', 
                            border: '3px solid #000',
                            borderRadius: '8px'
                        }}
                    >
                        <Typography variant="h6" className="ml-2 mt-2">Step 2: Spices & Seasonings</Typography>
                        <Box
                            className="p-2"
                            sx={{
                                minHeight: 350,
                                overflow: 'auto',
                                flexGrow: 1,
                            }}
                        >
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

            <Box 
                className="mr-10 ml-10 mt-10 rounded-md bg-themeCream text-black"
                sx={{ 
                    border: '3px solid #000',
                    borderRadius: '8px'
                }}
            >
                <Typography variant="h6" className="ml-2 mt-2" textAlign={"center"}>Step 3: Choose your Recipe</Typography>
                <Box
                    className="p-2"
                    sx={{
                        minHeight: 100,
                        overflow: 'auto',
                        flexGrow: 1,
                    }}
                >
                    <Stack direction={"row"} justifyContent={"space-evenly"} className="p-3">
                        <Button className="rounded-md bg-themeCopper text-white">Generate recipe with current ingredients</Button>
                        <Button className="rounded-md bg-themeCopper text-white">Suggest recipe with additional ingredients</Button>
                    </Stack>
                </Box>
            </Box>
        </div>
    );
}
