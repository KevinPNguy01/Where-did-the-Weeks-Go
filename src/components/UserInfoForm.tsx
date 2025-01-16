import Box from "@mui/material/Box/Box";
import Card from "@mui/material/Card/Card";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import TextField from "@mui/material/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function UserInfoForm() {
    const {birthDate, setBirthDate, lifeExpectancy, setLifeExpectancy} = useContext(UserContext);

    const lifeExpectancyChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLifeExpectancy(Math.max(0, Math.min(120, parseFloat(e.target.value))));
    }

    return (
        <Box 
            className="p-4 flex flex-col items-center gap-4"
            component="form" 
            sx={{backgroundColor:"background.paper"}}
        >
            <DatePicker onChange={(e) => {if (e) setBirthDate(e.toDate())}} label="Date of Birth"/>
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
        </Box>
    )
}