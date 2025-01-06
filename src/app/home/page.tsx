"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Oooh_Baby } from "next/font/google";
import { Jost } from "next/font/google";
import { Grid, Box, Typography, Button, Stack, Modal, TextField, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import Entry from "./entry";
import { useUser } from "@clerk/nextjs"
import Navbar from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete'
import { collection, getDocs, query, getDoc, deleteDoc, setDoc, doc, updateDoc } from "firebase/firestore"
import { db } from '@/firebase'

const oooh_baby = Oooh_Baby({
    weight: '400',
    style: 'normal',
    subsets: ['latin'],
});

const jost = Jost({
    weight: ['400'],
    subsets: ['latin'],
  })

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

interface IngredientData {
    amount: string;
    purchaseDate: string;
    expirationDate: string;
}

export default function Page() {
    const [open, setOpen] = useState(false);
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');
    const [purchaseDate, setPurchaseDate] = useState<string>('');
    const [data, setData] = useState<JsonData>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ingredients, setIngredients] = useState<Record<string, IngredientData>>({});
    const [spiceStates, setSpiceStates] = useState<{ [key: string]: boolean }>({});

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

    useEffect(() => {
        const fetchIngredients = async () => {
            if (!isLoaded || !isSignedIn || !user) {
                return;
            }

            const docRef = doc(collection(db, 'users'), user?.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setIngredients(docSnap.data().ingredients || {});
            }

            if (docSnap.exists() && docSnap.data().spices) {
                setSpiceStates(docSnap.data().spices);
            }
        };

        fetchIngredients();
    }, [isLoaded, isSignedIn, user]);

    const handleSpiceChange = (spiceName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpiceStates(prev => ({
            ...prev,
            [spiceName]: event.target.checked
        }));
    };

    const updateSpices = async () => {
        const docRef = doc(collection(db, 'users'), user?.id);
        await updateDoc(docRef, { spices: spiceStates });
    };

    const handleIngredientChange = (ingredient: string, data: IngredientData) => {
        setIngredients(prev => ({
            ...prev,
            [ingredient]: data
        }));
    };

    const removeIngredient = async (ingredient: string) => {
        const docRef = doc(collection(db, 'users'), user?.id);
        const newIngredients = { ...ingredients };
        delete newIngredients[ingredient];
        
        setIngredients(newIngredients);
        await updateDoc(docRef, { ingredients: newIngredients });
    };

    const addItem = async (ingredient: string, amount: string, purchaseDate: string) => {
        const docRef = doc(collection(db, 'users'), user?.id);
        const expirationData = await handleSubmit(expirationPrompt, ingredient + " - " + purchaseDate);
        const expirationDate = expirationData?.info[0]?.expirationDate || '';
        
        const newIngredient = {
            amount,
            purchaseDate,
            expirationDate
        };
        
        handleIngredientChange(ingredient, newIngredient);
        await updateDoc(docRef, { 
            ingredients: {
                ...ingredients,
                [ingredient]: newIngredient
            }
        });

        handleClose();
    };

    const handleSubmit = async (systemPrompt: string, userPrompt: string) => {
        const requestBody = {
            systemPrompt: systemPrompt,
            userPrompt: userPrompt
        };

        const response = await fetch('api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        setData(data);
        return data;
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
                            padding: '16px',
                            fontFamily: jost.style.fontFamily
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6" sx={{ marginLeft: '8px', marginTop: '8px', borderBottom: '0.15rem solid black', fontFamily: jost.style.fontFamily}}>Step 1: List of Ingredients</Typography>
                            <Button
                                sx={{ marginRight: '8px', marginTop: '8px', backgroundColor: '#B87333', color: 'white', fontFamily: jost.style.fontFamily }}
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
                                    <Stack direction="column" spacing={2}>
                                        <h1 className="text-add text-center">New Ingredient</h1>
                                        <TextField id="standard-basic" label="Ingredient Name" variant="standard" onChange={(e) => setIngredient(e.target.value)}/>
                                        <TextField className="mt-3" id="standard-basic" label="Quantity" variant="standard" onChange={(e) => setAmount(e.target.value)}/>
                                        <TextField className="mt-3" id="standard-basic" label="Purchase Date (mm/dd)" variant="standard" onChange={(e) => setPurchaseDate(e.target.value)} />
                                        <Button variant="contained" onClick={() => addItem(ingredient, amount, purchaseDate)} autoFocus>Add</Button>
                                    </Stack>
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
                            {Object.entries(ingredients).map(([ingredient, data]) => (
                                <Stack key={ingredient} direction="row" justifyContent={"space-between"} borderBottom={""}>
                                    <Typography className="pt-1.5">{data.amount} - {ingredient}</Typography>
                                    <Stack direction="row">
                                        <Typography alignContent="center" className="pl-2 pr-2 ml-2 text-black mr-2">
                                            Purchase Date: {data.purchaseDate}
                                        </Typography>
                                        <Typography alignContent="center" className="pl-2 pr-2 ml-2 text-black mr-2">
                                            Expiration Date: {data.expirationDate}
                                        </Typography>
                                        <IconButton 
                                            aria-label="delete" 
                                            onClick={() => removeIngredient(ingredient)}
                                        > 
                                            <DeleteIcon /> 
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            ))}
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
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6" sx={{ marginLeft: '8px', marginTop: '8px', borderBottom: '0.15rem solid black', width: '17rem', fontFamily: jost.style.fontFamily }}>Step 2: Spices & Seasonings</Typography>
                            <Button
                                sx={{ marginRight: '8px', marginTop: '8px', backgroundColor: '#B87333', color: 'white', fontFamily: jost.style.fontFamily }}
                                onClick={updateSpices}
                            >
                                Update Spices
                            </Button>
                        </Stack>
                        <Box sx={{ minHeight: 350, overflow: 'auto', flexGrow: 1, padding: '16px' }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={3}>
                                    <Stack>
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Salt"] || false}
                                                    onChange={handleSpiceChange("Salt")}
                                                />
                                            } 
                                            label="Salt" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Black Pepper"] || false}
                                                    onChange={handleSpiceChange("Black Pepper")}
                                                />
                                            } 
                                            label="Black Pepper" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Garlic Powder"] || false}
                                                    onChange={handleSpiceChange("Garlic Powder")}
                                                />
                                            } 
                                            label="Garlic Powder" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Onion Powder"] || false}
                                                    onChange={handleSpiceChange("Onion Powder")}
                                                />
                                            } 
                                            label="Onion Powder" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Paprika"] || false}
                                                    onChange={handleSpiceChange("Paprika")}
                                                />
                                            } 
                                            label="Paprika" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Chili Powder"] || false}
                                                    onChange={handleSpiceChange("Chili Powder")}
                                                />
                                            } 
                                            label="Chili Powder" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Cumin"] || false}
                                                    onChange={handleSpiceChange("Cumin")}
                                                />
                                            } 
                                            label="Cumin" 
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Stack>
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Basil"] || false}
                                                    onChange={handleSpiceChange("Basil")}
                                                />
                                            } 
                                            label="Basil" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Thyme"] || false}
                                                    onChange={handleSpiceChange("Thyme")}
                                                />
                                            } 
                                            label="Thyme" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Rosemary"] || false}
                                                    onChange={handleSpiceChange("Rosemary")}
                                                />
                                            } 
                                            label="Rosemary" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Cayenne Pepper"] || false}
                                                    onChange={handleSpiceChange("Cayenne Pepper")}
                                                />
                                            } 
                                            label="Cayenne Pepper" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Turmeric"] || false}
                                                    onChange={handleSpiceChange("Turmeric")}
                                                />
                                            } 
                                            label="Turmeric" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Coriander"] || false}
                                                    onChange={handleSpiceChange("Coriander")}
                                                />
                                            } 
                                            label="Coriander" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Parsley"] || false}
                                                    onChange={handleSpiceChange("Parsley")}
                                                />
                                            } 
                                            label="Parsley" 
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Stack>
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Cinnamon"] || false}
                                                    onChange={handleSpiceChange("Cinnamon")}
                                                />
                                            } 
                                            label="Cinnamon" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Nutmeg"] || false}
                                                    onChange={handleSpiceChange("Nutmeg")}
                                                />
                                            } 
                                            label="Nutmeg" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Red Pepper Flakes"] || false}
                                                    onChange={handleSpiceChange("Red Pepper Flakes")}
                                                />
                                            } 
                                            label="Red Pepper Flakes" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Bay Leaves"] || false}
                                                    onChange={handleSpiceChange("Bay Leaves")}
                                                />
                                            } 
                                            label="Bay Leaves" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Cardamom"] || false}
                                                    onChange={handleSpiceChange("Cardamom")}
                                                />
                                            } 
                                            label="Cardamom" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Sage"] || false}
                                                    onChange={handleSpiceChange("Sage")}
                                                />
                                            } 
                                            label="Sage" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Dill"] || false}
                                                    onChange={handleSpiceChange("Dill")}
                                                />
                                            } 
                                            label="Dill" 
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <Stack>
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Cloves"] || false}
                                                    onChange={handleSpiceChange("Cloves")}
                                                />
                                            } 
                                            label="Cloves" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Fennel Seeds"] || false}
                                                    onChange={handleSpiceChange("Fennel Seeds")}
                                                />
                                            } 
                                            label="Fennel Seeds" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Allspice"] || false}
                                                    onChange={handleSpiceChange("Allspice")}
                                                />
                                            } 
                                            label="Allspice" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Curry Powder"] || false}
                                                    onChange={handleSpiceChange("Curry Powder")}
                                                />
                                            } 
                                            label="Curry Powder" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Tarragon"] || false}
                                                    onChange={handleSpiceChange("Tarragon")}
                                                />
                                            } 
                                            label="Tarragon" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["White Pepper"] || false}
                                                    onChange={handleSpiceChange("White Pepper")}
                                                />
                                            } 
                                            label="White Pepper" 
                                        />
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    checked={spiceStates["Saffron"] || false}
                                                    onChange={handleSpiceChange("Saffron")}
                                                />
                                            } 
                                            label="Saffron" 
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Stack direction="row" justifyContent="space-evenly" spacing={1}>
                <Link href="/generate-recipes">
                    <Button sx={{ marginRight: '8px', marginTop: '30px', backgroundColor: '#B87333', color: 'white', minHeight: '4rem', minWidth: '8rem', fontFamily: jost.style.fontFamily, fontSize: "1.5rem"}}>
                        Step 3
                    </Button>
                </Link>
            </Stack>
        </div>
    );
}
