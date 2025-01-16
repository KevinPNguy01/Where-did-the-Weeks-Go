import './index.css'
import { Calendar } from './components/Calendar'
import { UserInfoForm } from './components/UserInfoForm'
import { theme } from './theme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { UserContext } from './contexts/UserContext'
import { useState } from 'react'

function App() {
    const [birthDate, setBirthDate] = useState(new Date(2004, 0, 21));
    const [lifeExpectancy, setLifeExpectancy] = useState(77.43);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{birthDate, setBirthDate, lifeExpectancy, setLifeExpectancy}}>
                    <div className='grid grid-cols-2 p-4 gap-4'>
                        <div><Calendar/></div>
                        <UserInfoForm/>
                    </div>
                </UserContext.Provider>
            </ThemeProvider>
        </LocalizationProvider>
    )
}

export default App
