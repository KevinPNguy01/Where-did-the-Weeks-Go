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

function App() {
    const [birthDate, setBirthDate] = useState(dayjs());
    const [lifeExpectancy, setLifeExpectancy] = useState(77.43);
    const [activities, setActivities] = useState<LifeActivity[]>([]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{birthDate, setBirthDate, lifeExpectancy, setLifeExpectancy, activities, setActivities}}>
                    <div className='grid grid-cols-2 p-4 gap-4'>
                        <div><Calendar activities={activities}/></div>
                        <UserInfoForm/>
                    </div>
                </UserContext.Provider>
            </ThemeProvider>
        </LocalizationProvider>
    )
}

export default App
