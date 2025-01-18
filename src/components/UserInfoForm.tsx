import Box from "@mui/material/Box/Box";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import TextField from "@mui/material/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Dayjs } from "dayjs";
import { ActivityList } from "../features/activities/ActivityList";
import { AddEventButton } from "../features/activities/AddEventButton";
import Typography from "@mui/material/Typography/Typography";

export function UserInfoForm() {
    const {birthDate, setBirthDate, lifeExpectancy, setLifeExpectancy} = useContext(UserContext);

    const birthDateChangeHandler = (e: Dayjs | null) => {
        if (!e) return;
        setBirthDate(e);
    }

    const lifeExpectancyChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLifeExpectancy(Math.max(0, Math.min(120, parseFloat(e.target.value))));
    }

    return (
        <Box 
            className="p-4 flex flex-col items-center justify-center h-screen"
            component="form" 
            sx={{backgroundColor:"background.paper"}}
        >
            <Typography variant="h6">Your Date of Birth</Typography>
            <DatePicker value={birthDate} onChange={birthDateChangeHandler}/>
            <br/>
            <TextField 
                label="Life Expectancy"
                type="number"
                value={lifeExpectancy}
                onChange={lifeExpectancyChangeHandler}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">years</InputAdornment>
                        }
                }}
            />
            <br/>
            <ActivityList/>
            <br/>
            <AddEventButton/>
        </Box>
    )
}