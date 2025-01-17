import dayjs from "dayjs"
import { LifeActivity } from "../types/LifeActivity";

const random = (start: number, end: number) => {
    return Math.random() * (end - start) + start;
}

const randomInt = (start: number, end: number) => {
    return Math.floor(random(start, end));
}

export const newActivity = (): LifeActivity => {
    return {
        name: "New Activity",
        start: dayjs(),
        end: dayjs().add(1, "years"),
        everyday: true,
        timeSpent: dayjs("02:00", "HH:mm"),
        color: `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
    };
}