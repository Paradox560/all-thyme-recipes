"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Oooh_Baby } from "next/font/google";
import { Grid, Box, Typography, Button, Stack, Modal, TextField, FormControlLabel, Checkbox } from "@mui/material";
import Entry from "./entry";
import { useUser } from "@clerk/nextjs"
import Navbar from '../components/Navbar';
import { collection, getDocs, query, getDoc, deleteDoc, setDoc, doc, updateDoc } from "firebase/firestore"
import { db } from '@/firebase'


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
interface InfoItem {
    name: string;
    purchaseDate: string;
    expirationDate: string;
}

interface JsonData {
    info: InfoItem[];
}
export default function Page() {
    const [open, setOpen] = useState(false);
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');
    const [purchaseDate, setPurchaseDate] = useState<string>('');
    const [data, setData] = useState<JsonData>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { isLoaded, isSignedIn, user } = useUser();

    const expirationPrompt = `You are a food specialist, you take in the purchase date of each item and return the expiration date of each item from it. Make sure to not skip any items.
        The "purchaseDate" should be the date that is passed in, and the "expirationDate" should be the estimated expiration date for each product.
        Make sure to only return one date in the format of mm/dd. If you are unable to find a singular date then return "NaN".
        You should return in the following JSON format:
        {
            info:[
                {
                    "name": str,
                    "purchaseDate": str,
                    "expirationDate": str
                }
            ]
        }
        Where name is the name of the product passed in, purchaseDate is the purchaseDate passed in for each product, and the generated expirationDate
    `
    
    const recipePrompt = `
        You are a food specialist, you take in all of the ingredients and their respective expiration dates and return a list of recipes that can be made with these ingredients.
        Try to prioritize including the items with the earliest expiration dates but this is not a hard requirement, you can choose from any of the ingredients provided but only these.
        The "name" should be the name of the meal, the "image" should be the image of the meal in the form of the image address, the "description" should be the description of the meal,
        the "ingredients" should be the ingredient list for this meal, and finally the "link" is the link to the recipe with steps to make the meal.
        You should return in the following JSON format:
        {
            info:[
                {
                    "name": str,
                    "image": str,
                    "description": str,
                    "link": str
                }
            ]
        }
    `
   
    
    const addItem = async (ingredient:string , amount:string, purchaseDate:string) => {
        const docRef = doc(collection(db, 'inventory'), user?.id)
        const docSnap = await getDoc(docRef)

        handleSubmit(expirationPrompt, ingredient + " - " + purchaseDate)
        if (docSnap.exists()) {
          const ingredients = docSnap.data().ingredients
          if(ingredient in ingredients) {
            
            ingredients[ingredient]= [amount, purchaseDate, data?.info.map(item => item.expirationDate)]
          }
           await updateDoc(docRef, {
            ingredients: ingredients});
        } else {
            await updateDoc(docRef, {
            [`ingredients`]: [amount, purchaseDate, data?.info.map(item => item.expirationDate)]});        }
    }

    
    const handleSubmit = async (systemPrompt: string, userPrompt: string) => {
        const requestBody = {
            systemPrompt: systemPrompt,
            userPrompt: userPrompt
        };

        fetch('api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then((res) => res.json())
        .then((data) => {
            setData(data);
        })
    };

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
                                <Box sx={style} className="text-black">
                                    <h1 className="text-add">New Ingredient</h1>
                                    <TextField id="standard-basic" label="Ingredient Name" variant="standard" onChange={(e) => setIngredient(e.target.value)}/>
                                    <TextField className="mt-3" id="standard-basic" label="Quantity" variant="standard" onChange={(e) => setAmount(e.target.value)}/>
                                    <TextField className="mt-3" id="standard-basic" label="Purchase Date (mm/dd)" variant="standard" onChange={(e) => setPurchaseDate(e.target.value)} />
                                    <Button onClick={() => addItem(ingredient, amount, purchaseDate)} autoFocus>Add</Button>
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
                    <Button sx={{ marginRight: '8px', marginTop: '30px', backgroundColor: '#B87333', color: 'white', minHeight: '4rem', minWidth: '7rem'}}>
                        Step 3
                    </Button>
                </Link>
            </Stack>
        </div>
    );
}
