import Box from "@mui/material/Box/Box";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import TextField from "@mui/material/TextField/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Dayjs } from "dayjs";
import { ActivityList } from "../features/activities/ActivityList";
import Typography from "@mui/material/Typography/Typography";
import Card from "@mui/material/Card/Card";

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
            className="gap-4 p-8 flex flex-col items-center justify-center min-w-screen w-fit"
            component="form" 
            sx={{backgroundColor:"background.paper"}}
        >
            <Card className="w-full p-8 gap-8 grid grid-cols-2 items-end place-items-center">
                <Box className="flex flex-col w-full">
                    <Typography fontSize="1.1rem" fontWeight="bold">Date of Birth</Typography>
                    <DatePicker value={birthDate} onChange={birthDateChangeHandler}/>
                </Box>
                <Box className="flex flex-col w-full">
                    <Typography fontSize="1rem" variant="h6">Life Expectancy</Typography>
                    <TextField 
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
            </Card>
            <ActivityList/>
        </Box>
    )
}