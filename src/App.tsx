import './index.css'
import { Calendar } from './components/Calendar'
import { UserInfoForm } from './components/UserInfoForm'
import { theme } from './theme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { UserContext } from './contexts/UserContext'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { LifeActivity } from './types/LifeActivity'
import Box from '@mui/material/Box/Box'
import Typography from '@mui/material/Typography/Typography'

function App() {
    const [birthDate, setBirthDate] = useState(dayjs("2004-01-21"));
    const [lifeExpectancy, setLifeExpectancy] = useState(77.43);
    const [activities, setActivities] = useState<LifeActivity[]>([]);

    useEffect(() => {
        setActivities([
            {
                name: "Sleep",
                start: dayjs(),
                end: dayjs(),
                timeSpent: dayjs("08:00", "HH:mm"),
                everyday: true,
                color: "#118ab2",
                quote: "The average adult needs around 7-9 hours of sleep per night."
            },
            {
                name: "Phone Screen Time",
                start: dayjs(),
                end: dayjs(),
                timeSpent: dayjs("04:37", "HH:mm"),
                everyday: true,
                color: "#06d6a0",
                quote: "The average person spends 4 hours and 37 minutes on their phone every day. Gen Z spends an average of over 6 hours per day!"
            },
            {
                name: "Housework",
                start: dayjs(),
                end: dayjs(),
                timeSpent: dayjs("02:25", "HH:mm"),
                everyday: true,
                color: "#ffd166",
                quote: "This is how long the average American spends on household activities such as cooking, cleaning, etc. Women spend an average of 25% longer in this category than men!"
            },
            {
                name: "Personal Care and Hygiene",
                start: dayjs(),
                end: dayjs(),
                timeSpent: dayjs("00:46", "HH:mm"),
                everyday: true,
                color: "#ef476f",
                quote: "This category includes self-care activities such as bathing and grooming."
            }
        ]);
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{birthDate, setBirthDate, lifeExpectancy, setLifeExpectancy, activities, setActivities}}>
                    <div className='sm:grid grid-cols-2 p-4 gap-4'>
                        <Box className="flex flex-col items-center">
                            <Typography textAlign="center" variant="h4" fontWeight="bold">Your Life in Weeks</Typography>
                            <Typography textAlign="center" fontSize={12}>Time is precious. How are you spending it?</Typography>
                            <br/>
                            <Calendar activities={activities}/>
                        </Box>
                        <UserInfoForm/>
                    </div>
                </UserContext.Provider>
            </ThemeProvider>
        </LocalizationProvider>
    )
}

export default App
