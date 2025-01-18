import TableRow from "@mui/material/TableRow/TableRow";
import { LifeActivity } from "../../types/LifeActivity";
import { EventMenu } from "./EventMenu";
import TableCell from "@mui/material/TableCell/TableCell";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import IconButton from "@mui/material/IconButton/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

export function EditableActivity({activity, index}: {activity: LifeActivity, index: number}) {
    const {activities, setActivities} = useContext(UserContext);
    const {start, end, everyday, timeSpent} = activity;
    const [open, setOpen] = useState(false);
    const today = dayjs();
    const hours = timeSpent.hour();
    const hoursText = `${hours} hr${hours > 1 ? "s" : ""}`;
    const minutes = timeSpent.minute();
    const minutesText = minutes > 0 ? ` ${minutes} min${minutes > 1 ? "s" : ""}` : "";
    const fromText = everyday || start.unix() < today.unix() ? "Now" : start.format("MMM DD, YYYY");
    const toText = everyday ? "Forever" : end.format("MMM DD, YYYY");

    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = () => {
        setActivities([...activities]);
        handleClose();
    }
    const deleteHandler = () => {
        activities.splice(index, 1);
        setActivities([...activities]);
        handleClose();
    };

    return (
        <>
            <EventMenu 
                edit={true} 
                open={open} 
                onClose={handleClose} 
                activity={activity} 
                onSubmit={handleSubmit}
                onDelete={deleteHandler}
            />
            <TableRow onClick={handleOpen} className="flex items-end gap-4 hover:bg-[#333] cursor-pointer">
                <TableCell>
                    <div className="rounded-full h-6 aspect-square" style={{backgroundColor: activity.color}}/>
                </TableCell>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{hoursText}{minutesText}</TableCell>
                <TableCell className="!hidden md:!table-cell">{fromText}</TableCell>
                <TableCell className="!hidden md:!table-cell">{toText}</TableCell>
                <TableCell className="!hidden lg:!table-cell">
                    <IconButton onClick={deleteHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    )
}