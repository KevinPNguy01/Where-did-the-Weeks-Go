import { Dayjs } from "dayjs"

export type LifeActivity = {
    name: string
    timeSpent: number
    everyday: boolean
    start: Dayjs
    end: Dayjs
}