import dayjs, { Dayjs } from "dayjs"

export const diffWeeks = (start: Dayjs, end: Dayjs): number => {
    const startDate = dayjs(start).subtract(start.year(), "years");
    const endDate = dayjs(end).subtract(end.year(), "years");
    const isBefore = startDate.unix() < endDate.unix();

    const yearsDiff = end.year() - start.year() - (isBefore ? 0 : 1);
  
    const weeksFromYears = Math.floor(yearsDiff * 52);
  
    const remainingDays = endDate.diff(startDate, 'day') + (isBefore ? 0 : 365);
  
    const weeksFromDays = Math.floor(remainingDays / 7);
  
    return weeksFromYears + weeksFromDays;
};