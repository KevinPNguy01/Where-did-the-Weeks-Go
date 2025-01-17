import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import { TimeField } from "@mui/x-date-pickers/TimeField/TimeField";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Typography from "@mui/material/Typography/Typography";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Switch from "@mui/material/Switch/Switch";
import { MuiColorInput } from "mui-color-input";
import Button from "@mui/material/Button/Button";

export function AddEventMenu({onClose}: {onClose: () => void}) {
    const {activities, setActivities} = useContext(UserContext);
    const [color, setColor] = useState("#f80");
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(1, "year"));
    const [timeSpent, setTimeSpent] = useState(dayjs("2000-00-00T00:00"));
    const [everyday, setEveryday] = useState(false);

    const submitHandler = () => {
        let start = startDate;
        let end = endDate;
        setActivities([...activities, {color, name, start, end, everyday, timeSpent: timeSpent.get("hours") * 60 + timeSpent.get("minutes")}])
        onClose();
    }

    return (
        <Box className="flex flex-col gap-4">
            <Typography variant="h5">Add Life Event</Typography>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <TimeField
                label="Time Spent"
                value={timeSpent}
                onChange={(e) => {if (e) setTimeSpent(e)}}
                format="HH:mm"
                ampm={false}
            />
            <FormControlLabel 
                label="Forever" 
                control={
                    <Switch value={everyday} onChange={(e) => setEveryday(e.target.checked)}/>
                }  
            />
            <Box>
                <DatePicker disabled={everyday} value={startDate} onChange={(e) => {if (e) setStartDate(e)}} label="From"/>
                <DatePicker disabled={everyday} value={endDate} onChange={(e) => {if (e) setEndDate(e)}} label="To"/>
            </Box>
            <MuiColorInput label="Color" format="hex" value={color} onChange={(e) => setColor(e)}/>
            <Button onClick={submitHandler}>Add Event</Button>
        </Box>
    )
}