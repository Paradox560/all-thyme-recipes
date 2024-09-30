import { Box, Typography, Stack, ListItem } from "@mui/material";

export default function Tile() {
    return (
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
                <Typography>Chicken Fajitas</Typography>
                <img src="/download.jpg"></img>
                <Typography>Description: Experience a burst of flavors with our Chicken Fajitas, where juicy, well-seasoned chicken melds perfectly with sweet bell peppers and smoky spices, all brightened by a splash of fresh lime and creamy avocado for an irresistible taste sensation.</Typography>
                <Typography>Link: https://www.spendwithpennies.com/easy-chicken-fajitas/</Typography>
            </Stack>
        </Box>
    );
}