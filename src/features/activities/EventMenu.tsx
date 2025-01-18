import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField/TimeField";
import Typography from "@mui/material/Typography/Typography";
import Switch from "@mui/material/Switch/Switch";
import { MuiColorInput } from "mui-color-input";
import Button from "@mui/material/Button/Button";
import { LifeActivity } from "../../types/LifeActivity";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Divider from "@mui/material/Divider/Divider";

export function EventMenu({activity, edit, open, onClose, onSubmit, onDelete}: {activity: LifeActivity, edit: boolean, open: boolean, onClose: () => void, onSubmit: () => void, onDelete?: () => void}) {
    const [color, setColor] = useState(activity.color);
    const [name, setName] = useState(activity.name);
    const [start, setStart] = useState(activity.start);
    const [end, setEnd] = useState(activity.end);
    const [timeSpent, setTimeSpent] = useState(activity.timeSpent);
    const [everyday, setEveryday] = useState(activity.everyday);

    useEffect(() => {
        setColor(activity.color);
        setName(activity.name);
        setStart(activity.start);
        setEnd(activity.end);
        setTimeSpent(activity.timeSpent);
        setEveryday(activity.everyday);
    }, [activity]);

    const submitHandler = () => {
        Object.assign(activity, {color, name, start, end, everyday, timeSpent, quote: ""})
        onSubmit();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{`${edit ? "Edit" : "Add"} Activity`}</DialogTitle>
            <DialogContent className="flex flex-col !pt-1 gap-4">
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <Divider/>
                <Box className="flex items-center gap-4">
                    <AccessTimeIcon/>
                    <Typography>Every Day</Typography>
                    <Switch value={everyday} defaultChecked={everyday} onChange={(e) => setEveryday(e.target.checked)}/>
                </Box>
                <Box className="pl-9 grid grid-cols-2 gap-4">
                    <DatePicker disabled={everyday} value={everyday ? null : start} onChange={(e) => {if (e) setStart(e)}} label={everyday ? "Now" : "From"}/>
                    <DatePicker disabled={everyday} value={everyday ? null : end} onChange={(e) => {if (e) setEnd(e)}} label={everyday ? "Forever" : "To"}/>
                    <TimeField
                        className="col-span-2"
                        label="Time Spent"
                        value={timeSpent}
                        onChange={(e) => {if (e) setTimeSpent(e)}}
                        format="HH:mm"
                        ampm={false}
                    />
                </Box>
                <Divider/>
                <MuiColorInput label="Color" format="rgb" value={color} onChange={(e) => setColor(e)}/>
                <Box className={onDelete ? "grid grid-cols-2" : ""}>
                    {onDelete && (
                        <Button color="error" onClick={onDelete}>Delete</Button>
                    )}
                    <Button className="w-full" onClick={submitHandler}>{`${edit ? "Edit" : "Add"} Activity`}</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}