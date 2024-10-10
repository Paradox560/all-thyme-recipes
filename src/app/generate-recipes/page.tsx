'use client'
import { useState } from 'react';
import { Oooh_Baby } from "next/font/google";
import { Typography, Box, Stack, Button } from "@mui/material";
import Tile from "./tile";
import Navbar from "../components/Navbar";
import { Jost } from "next/font/google";

const oooh_baby = Oooh_Baby({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
});

const jost = Jost({
    weight: ['300','400','500'],
    subsets: ['latin'],
  })

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
                <Typography variant="h6" sx={{ marginLeft: '8px', marginTop: '8px', textAlign: 'center', fontFamily: jost.style.fontFamily }}>
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
                                <Typography>Beef</Typography>
                                <Typography>10/02</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Chicken</Typography>
                                <Typography>09/28</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Eggplant</Typography>
                                <Typography>10/19</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Fish</Typography>
                                <Typography>10/01</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Potatoes</Typography>
                                <Typography>12/07</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Spaghetti</Typography>
                                <Typography>05/18</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Onions</Typography>
                                <Typography>06/10</Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ minWidth: '100px', marginRight: '16px' }}>
                            <Stack>
                                <Typography>Bell Peppers</Typography>
                                <Typography>12/21</Typography>
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
                        <Typography variant="h6" sx={{ marginLeft: '8px', marginTop: '8px', textAlign: 'center', fontFamily: jost.style.fontFamily }}>
                            Recipes
                        </Typography>
                        <Box sx={{ padding: '16px', minHeight: '340px', overflow: 'auto' }}>
                            <Box sx={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap', padding: '0px' }}>
                                <Stack direction="row" sx={{ padding: '8px' }}>
                                    <Box sx={{ padding: '16px' }}>
                                    <Box 
            className="bg-themeBlue rounded-md text-black p-2"
            minHeight={290} 
            maxHeight={250} 
            minWidth={375} 
            maxWidth={375} 
            sx={{
                overflowY: 'auto',  // Enable vertical scrolling within each tile
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                border: '1.5px solid #000',
                borderRadius: '8px'
            }}
        >
            <Stack justifyContent={"space-between"}>
                <Typography style={{marginTop: "-2.7rem", fontFamily: jost.style.fontFamily, fontWeight: 400, fontSize: "1.3rem"}} >Chicken Fajitas</Typography>
                <img src="/download.jpg"></img>
                <Typography>Description: Experience a burst of flavors with our Chicken Fajitas, where juicy, well-seasoned chicken melds perfectly with sweet bell peppers and smoky spices, all brightened by a splash of fresh lime and creamy avocado for an irresistible taste sensation.</Typography>
                <Typography>Link: https://www.spendwithpennies.com/easy-chicken-fajitas/</Typography>
            </Stack>
        </Box>
                                    </Box>
                                    <Box sx={{ padding: '16px' }}>
                                    <Box 
            className="bg-themeBlue rounded-md text-black p-2"
            minHeight={290} 
            maxHeight={250} 
            minWidth={375} 
            maxWidth={375} 
            sx={{
                overflowY: 'auto',  // Enable vertical scrolling within each tile
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                border: '1.5px solid #000',
                borderRadius: '8px'
            }}
        >
            <Stack justifyContent={"space-between"}>
                <Typography style={{marginTop: "-2.7rem", fontFamily: jost.style.fontFamily, fontWeight: 400, fontSize: "1.3rem"}} >Beef and Potato Hash</Typography>
                <img src="/beef-and-potato.jpg"></img>
                <Typography>Description: A beef and potato hash is a savory dish made by sautéing ground beef with diced, crispy potatoes, onions, and bell peppers until everything is tender and golden brown. The flavors blend together to create a hearty, flavorful meal that is perfect for breakfast or dinner.</Typography>
                <Typography>Link: https://busycooks.com/ground-beef-potato-hash/</Typography>
            </Stack>
        </Box>
                                    </Box>
                                    <Box sx={{ padding: '16px' }}>
                                    <Box 
            className="bg-themeBlue rounded-md text-black p-2"
            minHeight={290} 
            maxHeight={250} 
            minWidth={375} 
            maxWidth={375} 
            sx={{
                overflowY: 'auto',  // Enable vertical scrolling within each tile
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                border: '1.5px solid #000',
                borderRadius: '8px'
            }}
        >
            <Stack justifyContent={"space-between"}>
                <Typography style={{marginTop: "-2.7rem", fontFamily: jost.style.fontFamily, fontWeight: 400, fontSize: "1.3rem"}} >Egg Fried Rice</Typography>
                <img src="/egg-fried-rice.jpg" ></img>
                <Typography>Egg fried rice is a delicious dish made by stir-frying fluffy rice with scrambled eggs, onions, and bell peppers, creating a simple yet flavorful combination. The eggs coat the rice with a savory richness, while the vegetables add a hint of sweetness and crunch.
</Typography>
                <Typography >Link: https://www.allrecipes.com/recipe/23298/egg-fried-rice/</Typography>
            </Stack>
        </Box>
                                    </Box>
                                    <Box sx={{ padding: '16px' }}>
                                    <Box 
            className="bg-themeBlue rounded-md text-black p-2"
            minHeight={290} 
            maxHeight={250} 
            minWidth={375} 
            maxWidth={375} 
            sx={{
                overflowY: 'auto',  // Enable vertical scrolling within each tile
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                border: '1.5px solid #000',
                borderRadius: '8px'
            }}
        >
            <Stack justifyContent={"space-between"}>
                <Typography style={{marginTop: "-2.7rem", fontFamily: jost.style.fontFamily, fontWeight: 400, fontSize: "1.3rem"}} >Fish Tacos</Typography>
                <img src="/fish-tacos.jpg"></img>
                <Typography>Description: Fish tacos are a flavorful dish featuring tender, seasoned fish fillets wrapped in a soft tortilla or bread, topped with fresh lettuce, juicy tomatoes, and crunchy onions. The combination of the flaky fish and crisp vegetables creates a refreshing and satisfying bite with every taste.
</Typography>
                <Typography>Link: https://natashaskitchen.com/fish-tacos-recipe/</Typography>
            </Stack>
        </Box>
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
                                    fontFamily: jost.style.fontFamily,
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
                                    fontFamily: jost.style.fontFamily,
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

