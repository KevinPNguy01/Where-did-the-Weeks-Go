import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField/TimeField";
import Typography from "@mui/material/Typography/Typography";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Switch from "@mui/material/Switch/Switch";
import { MuiColorInput } from "mui-color-input";
import Button from "@mui/material/Button/Button";
import { LifeActivity } from "../../types/LifeActivity";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog/Dialog";

export function EventMenu({activity, edit, open, onClose, onSubmit}: {activity: LifeActivity, edit: boolean, open: boolean, onClose: () => void, onSubmit: () => void}) {
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
        Object.assign(activity, {color, name, start, end, everyday, timeSpent})
        onSubmit();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <Box className="flex flex-col gap-4">
                <Typography variant="h5">{`${edit ? "Edit" : "Add"} Activity`}</Typography>
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <TimeField
                    label="Time Spent"
                    value={timeSpent}
                    onChange={(e) => {if (e) setTimeSpent(e)}}
                    format="HH:mm"
                    ampm={false}
                />
                <FormControlLabel 
                    label="Every Day" 
                    control={
                        <Switch value={everyday} defaultChecked={everyday} onChange={(e) => setEveryday(e.target.checked)}/>
                    }  
                />
                <Box>
                    <DatePicker disabled={everyday} value={start} onChange={(e) => {if (e) setStart(e)}} label="From"/>
                    <DatePicker disabled={everyday} value={end} onChange={(e) => {if (e) setEnd(e)}} label="To"/>
                </Box>
                <MuiColorInput label="Color" format="rgb" value={color} onChange={(e) => setColor(e)}/>
                <Button onClick={submitHandler}>{`${edit ? "Edit" : "Add"} Event`}</Button>
            </Box>
        </Dialog>
    )
}