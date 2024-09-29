'use client'

import { useUser } from "@clerk/nextjs"
import { Button } from "@mui/material";

export default function Page() {
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
            console.log(data);
        })
    };
    
   
    return (
        <Button sx={{ flex: 1 }} variant='contained' color='primary' onClick={() => handleSubmit(expirationPrompt, 'Eggs - 09/29, Bread - 09/28')} >
                {' '}
                Submit
        </Button>
    )
}