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
                overflowY: 'auto',  // Enable vertical scrolling within each tile
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                border: '1.5px solid #000',
                borderRadius: '8px'
            }}
        >
            <Stack direction="row" justifyContent={"space-between"}>
                <Typography>Chicken Fajitas</Typography>
                <Typography>[Insert Image Here]</Typography>
            </Stack>
            <Typography>Description: sergoisejigosjrtfio sejoigjrseoifgsrjtoigs joi ejrotigjs deoitgjseorig sftgjrsoig jseoirgj rsoijerdio</Typography>
            <Typography>Ingredients List:</Typography>
            <ListItem>tomato</ListItem>
            <ListItem>cheese</ListItem>
            <ListItem>mango</ListItem>
            <ListItem>mango</ListItem>
            <ListItem>mango</ListItem>
            <Typography>Link: https://www.efoisrejgiesooer.com/serigojes/cxowjrfoie</Typography>
        </Box>
    );
}
