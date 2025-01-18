import { EventMenu } from "./EventMenu";
import { useContext, useState } from "react";
import Fab from "@mui/material/Fab/Fab";
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from "../../contexts/UserContext";
import { newActivity } from "../../utils/activity";

export function AddEventButton() {
    const {activities, setActivities} = useContext(UserContext);
    const [open, setOpen] = useState(false);
    let activity = newActivity();

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const handleSubmit = () => {
        setActivities(activities.concat(activity));
        handleClose();
    }

    return (
        <>
            <EventMenu edit={false} open={open} onClose={handleClose} activity={activity} onSubmit={handleSubmit}/>
            <Fab className="!relative" onClick={handleOpen} color="primary">
                <AddIcon/>
            </Fab>
        </>
    )
}