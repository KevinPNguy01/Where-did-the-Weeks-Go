import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { LifeActivity } from "../types/LifeActivity";
import dayjs from "dayjs";
import { diffWeeks } from "../utils/time";

export function Calendar({activities}: {activities: LifeActivity[]}) {
    const {birthDate, lifeExpectancy} = useContext(UserContext);

    const today = dayjs();
    const weeksLived = diffWeeks(birthDate, today);
    const events = [[weeksLived, "#444"]].concat(
        activities.map(({start, end, timeSpent, everyday, color}) => {
            let startDate = start.unix() < today.unix() ? today : start;
            let endDate = end;
            if (everyday) {
                startDate = birthDate.unix() < today.unix() ? today : birthDate;
                endDate = today.add(lifeExpectancy, "years").subtract(today.unix() - birthDate.unix(), "seconds");
            }
            return [diffWeeks(startDate, endDate) * (timeSpent.hour() * 60 + timeSpent.minute()) / 24 / 60, color];
        }).filter(([weeks]) => weeks != 0)
    ) as [number, string][];

    return (
        <>
            <table className="border-separate border-spacing-[1px]">
                <tbody>
                    {Array.from({length: Math.floor(lifeExpectancy)}).map((_, rowIndex) => {
                        return (
                            <Year index={rowIndex} key={rowIndex} numWeeks={52} events={events}/>
                        );
                    })}
                    <Year index={Math.floor(lifeExpectancy)} numWeeks={Math.floor((lifeExpectancy % 1) * 52)} events={events}/>
                </tbody>
            </table>
        </>
    );
}

function Year({index, numWeeks, events}: {index: number, numWeeks: number, events: [number, string][]}) {
    return (
        <tr>
            {Array.from({length: numWeeks}).map((_, colIndex) => {
                return (
                    <Week index={52 * index + colIndex} key={colIndex} events={events}/>
                )
            })}
        </tr>
    )
}

function Week({index, events}: {index: number, events: [number, string][]}) {
    let color = "";
    let sum = events.map(([weeks]) => weeks).reduce((a, b) => a + b, 0);
    for (let i = events.length-1; i > -1; --i) {
        if (index < sum) {
            color = events[i][1];
        }
        sum -= events[i][0];
    }
    return (
        <td
            style={{
                backgroundColor: color
            }}
            className={`sm:p-[.2rem] p-[.1rem] border ${color === "" ? "border-[#888]" : "border-white/0"} rounded-sm`}
        />
    )
}