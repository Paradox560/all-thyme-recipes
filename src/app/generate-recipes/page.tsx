'use client'
import { Oooh_Baby } from "next/font/google";
import { Typography, Box, Stack, Button } from "@mui/material";
import Tile from "./tile"
import Navbar from "../components/Navbar"

const oooh_baby = Oooh_Baby({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
});

export default function Page() {
    return (
        <div className="min-h-screen full-width bg-themeGreen">
            <Navbar />
            <Typography style={{ fontFamily: oooh_baby.style.fontFamily }} className="text-title text-themeCream text-center">Recipes</Typography>
            <Box 
                className="mr-10 ml-10 mt-2 rounded-md bg-themeCream text-black"
                sx={{ 
                    border: '3px solid #000',
                    borderRadius: '8px'
                }}
            >
                <Typography variant="h6" className="ml-2 mt-2" textAlign={"center"}>Ingredients and Expiration Dates</Typography>
                <Box
                    className="p-2"
                    sx={{
                        minHeight: 75,
                        overflow: 'auto',
                        flexGrow: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            padding: '16px',
                        }}
                    >
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px'}}>
                            <Stack>
                                <Typography>Eggs</Typography>
                                <Typography>09/27</Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box 
                className="mr-10 ml-10 mt-4 rounded-md bg-themeCream text-black"
                sx={{ 
                    border: '3px solid #000',
                    borderRadius: '8px',
                }}
            >
                <Typography variant="h6" className="ml-2 mt-2" textAlign={"center"}>Recipes</Typography>
                <Box
                    className="p-2"
                    sx={{
                        minHeight: 340,
                        overflow: 'auto',
                        flexGrow: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            padding: '0px',
                        }}
                    >
                        <Stack direction="row" className="p-1">
                            <div className="p-2">
                                <Tile/>
                            </div>
                            <div className="p-2">
                                <Tile/>
                            </div>
                            <div className="p-2">
                                <Tile/>
                            </div>
                            <div className="p-2">
                                <Tile/>
                            </div>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <div className="text-center p-3">
                <Button className="bg-themeCopper text-themeCream text-center">Re-Generate Additional Recipes</Button>
            </div>
        </div>
    );
}