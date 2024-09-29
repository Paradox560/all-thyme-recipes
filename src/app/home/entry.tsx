import {useState} from 'react'
import {Grid, Box, Typography, Button, Stack, IconButton, Modal} from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'

export default function Entry() {
    const [visible, setVisible] = useState(true);

    const handleDelete = () => {
        setVisible(false);
    };

    if (!visible) {
        return null;
    }

    return (
        <Stack direction="row" justifyContent={"space-between"} borderBottom={""}>
            <Typography className="pt-1.5">16 Eggs</Typography>
            <Stack direction="row">
                <Typography alignContent="center" className="pl-2 pr-2 ml-2 text-black mr-2">Date Purchased: September 17th</Typography>
                <IconButton aria-label="delete" onClick={handleDelete}> <DeleteIcon /> </IconButton>
            </Stack>
        </Stack>
    );
}