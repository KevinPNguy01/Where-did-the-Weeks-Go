import { Dayjs } from "dayjs"

export type LifeActivity = {
    name: string
    timeSpent: Dayjs
    everyday: boolean
    start: Dayjs
    end: Dayjs
    color: string
    quote?: string
}