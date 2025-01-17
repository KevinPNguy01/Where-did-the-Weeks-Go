import Dialog from "@mui/material/Dialog/Dialog";
import { AddEventMenu } from "./AddEventMenu";
import { useState } from "react";
import Fab from "@mui/material/Fab/Fab";
import AddIcon from '@mui/icons-material/Add';

export function AddEventButton() {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <AddEventMenu onClose={handleClose}/>
            </Dialog>
            <Fab onClick={handleOpen} color="primary">
                <AddIcon/>
            </Fab>
        </>
    )
}