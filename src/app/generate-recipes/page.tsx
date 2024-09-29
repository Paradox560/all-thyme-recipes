'use client'
import { useState } from 'react';
import { Oooh_Baby } from "next/font/google";
import { Typography, Box, Stack, Button } from "@mui/material";
import Tile from "./tile";
import Navbar from "../components/Navbar";

const oooh_baby = Oooh_Baby({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
});

export default function Page() {
    const [showRecipes, setShowRecipes] = useState(false);

    const handleClick = () => {
        setShowRecipes(true);
    };

    return (
        <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#3D5926' }}>
            <Navbar />
            <Typography 
                style={{ fontFamily: oooh_baby.style.fontFamily, color: '#f0e68c', textAlign: 'center', fontSize: '60px' }}
            >
                Recipes
            </Typography>

            <Box 
                sx={{ 
                    margin: '2px 40px', 
                    padding: '10px', 
                    backgroundColor: '#FDEDD6',
                    color: 'black',
                    border: '3px solid black',
                    borderRadius: '8px'
                }}
            >
                <Typography variant="h6" sx={{ marginLeft: '8px', marginTop: '8px', textAlign: 'center' }}>
                    Ingredients and Expiration Dates
                </Typography>

                <Box sx={{ padding: '16px', minHeight: '75px', overflow: 'auto' }}>
                    <Box sx={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Milk</Typography>
                                <Typography>09/30</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Butter</Typography>
                                <Typography>10/05</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Cheese</Typography>
                                <Typography>10/01</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Bread</Typography>
                                <Typography>09/29</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Tomatoes</Typography>
                                <Typography>09/25</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Lettuce</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Apples</Typography>
                                <Typography>10/02</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Chicken</Typography>
                                <Typography>09/28</Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {!showRecipes && (
                <div style={{ textAlign: 'center', padding: '16px' }}>
                    <Stack direction='row' justifyContent={'space-evenly'}>
                        <Button 
                            sx={{ 
                                backgroundColor: '#B37238',
                                color: '#FDEDD6',
                                '&:hover': { backgroundColor: '#9e5e24' } 
                            }} 
                            onClick={handleClick}
                        >
                            Generate Recipe with Current Ingredients
                        </Button>
                        <Button 
                            sx={{ 
                                backgroundColor: '#B37238',
                                color: '#FDEDD6',
                                '&:hover': { backgroundColor: '#9e5e24' } 
                            }} 
                            onClick={handleClick}
                        >
                            Suggest Recipe with Additional Ingredients
                        </Button>
                    </Stack> 
                </div>
            )}

            {showRecipes && (
                <Box>
                    <Box 
                        sx={{ 
                            margin: '2px 40px', 
                            backgroundColor: '#FDEDD6', 
                            color: 'black',
                            border: '3px solid black',
                            borderRadius: '8px',
                        }}
                    >
                        <Typography variant="h6" sx={{ marginLeft: '8px', marginTop: '8px', textAlign: 'center' }}>
                            Recipes
                        </Typography>
                        <Box sx={{ padding: '16px', minHeight: '340px', overflow: 'auto' }}>
                            <Box sx={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', padding: '0px' }}>
                                <Stack direction="row" sx={{ padding: '8px' }}>
                                    <Box sx={{ padding: '16px' }}>
                                        <Tile />
                                    </Box>
                                    <Box sx={{ padding: '16px' }}>
                                        <Tile />
                                    </Box>
                                    <Box sx={{ padding: '16px' }}>
                                        <Tile />
                                    </Box>
                                    <Box sx={{ padding: '16px' }}>
                                        <Tile />
                                    </Box>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                    <Box style={{ textAlign: 'center', padding: '16px' }}>
                        <Stack direction='row' justifyContent={'space-evenly'}>
                            <Button 
                                sx={{ 
                                    backgroundColor: '#B37238',
                                    color: '#FDEDD6',
                                    '&:hover': { backgroundColor: '#9e5e24' } 
                                }} 
                                onClick={handleClick}
                            >
                                Generate Recipe with Current Ingredients
                            </Button>
                            <Button 
                                sx={{ 
                                    backgroundColor: '#B37238',
                                    color: '#FDEDD6',
                                    '&:hover': { backgroundColor: '#9e5e24' } 
                                }} 
                                onClick={handleClick}
                            >
                                Suggest Recipe with Additional Ingredients
                            </Button>
                        </Stack> 
                    </Box>
                </Box>
            )}
        </div>
    );
}
