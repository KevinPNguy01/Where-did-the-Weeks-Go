import { createContext } from "react";

export const UserContext = createContext({
    birthDate: new Date(),
    setBirthDate: (date: Date) => console.log(date),
    lifeExpectancy: 0,
    setLifeExpectancy: (years: number) => console.log(years)
});