import dayjs, { Dayjs } from "dayjs";
import { createContext } from "react";
import { LifeActivity } from "../types/LifeActivity";

export const UserContext = createContext({
    birthDate: dayjs(),
    setBirthDate: (date: Dayjs) => console.log(date),
    lifeExpectancy: 0,
    setLifeExpectancy: (years: number) => console.log(years),
    activities: [] as LifeActivity[],
    setActivities: (activities: LifeActivity[]) => console.log(activities)
});