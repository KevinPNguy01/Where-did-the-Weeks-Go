import './index.css'
import { Calendar } from './components/Calendar'
import { UserInfoForm } from './components/UserInfoForm'
import { theme } from './theme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { UserContext } from './contexts/UserContext'
import { useState } from 'react'
import dayjs from 'dayjs'
import { LifeActivity } from './types/LifeActivity'
import Box from '@mui/material/Box/Box'
import Typography from '@mui/material/Typography/Typography'

function App() {
    const [birthDate, setBirthDate] = useState(dayjs());
    const [lifeExpectancy, setLifeExpectancy] = useState(77.43);
    const [activities, setActivities] = useState<LifeActivity[]>([
        {
            name: "Sleep",
            start: dayjs(),
            end: dayjs(),
            timeSpent: 8 * 60,
            everyday: true,
            color: "#f0f"
        }
    ]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{birthDate, setBirthDate, lifeExpectancy, setLifeExpectancy, activities, setActivities}}>
                    <div className='grid grid-cols-2 p-4 gap-4'>
                        <Box className="flex flex-col items-center">
                            <Typography variant="h2" fontWeight="bold">Your Life in Weeks</Typography>
                            <Typography>Time is precious. How are you spending it?</Typography>
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
