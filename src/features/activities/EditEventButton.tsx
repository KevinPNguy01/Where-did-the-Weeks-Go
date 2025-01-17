import IconButton from "@mui/material/IconButton/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import { LifeActivity } from "../../types/LifeActivity";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { EventMenu } from "./EventMenu";

export function EditEventButton({activity}: {activity: LifeActivity}) {
    const {activities, setActivities} = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = () => {
        setActivities([...activities]);
        handleClose();
    }

    return (
        <>
            <EventMenu edit={true} open={open} onClose={handleClose} activity={activity} onSubmit={handleSubmit}/>
            <IconButton onClick={handleOpen}>
                <EditIcon/>
            </IconButton>
        </>
    )
}