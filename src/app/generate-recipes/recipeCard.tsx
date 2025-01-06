import { Stack, Box, Typography } from "@mui/material";
import { Jost } from "next/font/google";

interface RecipeProps {
    title: string;
    image: string;
    description: string;
    link: string;
    additionalIngredients?: string;
}

const jost = Jost({
    weight: ['300', '400', '500'],
    subsets: ['latin'],
});

const RecipeCard = ({ title, image, description, link, additionalIngredients }: RecipeProps) => (
    <Box sx={{ padding: '16px' }}>
        <Box 
            className="bg-themeBlue rounded-md text-black p-2"
            minHeight={290} 
            maxHeight={250} 
            minWidth={375} 
            maxWidth={375} 
            sx={{
                overflowY: 'auto',
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                border: '1.5px solid #000',
                borderRadius: '8px'
            }}
        >
            <Stack justifyContent={"space-between"} spacing={2}>
                <Typography sx={{marginTop: "-2.7rem", fontFamily: jost.style.fontFamily, fontWeight: 400, fontSize: "1.3rem"}}>
                    {title}
                </Typography>
                {/* <img src={image} alt={title} /> */}
                <Typography>Description: {description}</Typography>
                {additionalIngredients && (
                    <Typography>
                        Additional Ingredients Needed: {additionalIngredients}
                    </Typography>
                )}
                <Typography>Link: {link}</Typography>
            </Stack>
        </Box>
    </Box>
);

export default RecipeCard;