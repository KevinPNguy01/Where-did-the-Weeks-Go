import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { LifeActivity } from "../types/LifeActivity";
import dayjs from "dayjs";
import { diffWeeks } from "../utils/time";

export function Calendar({activities}: {activities: LifeActivity[]}) {
    const {birthDate, lifeExpectancy} = useContext(UserContext);

    const today = dayjs();

    const events = [diffWeeks(birthDate, today)].concat(
        activities.map(({start, end, timeSpent, everyday}) => {
            let startDate = start;
            let endDate = end;
            if (everyday) {
                startDate = today;
                endDate = today.add(lifeExpectancy, "years").subtract(today.unix() - birthDate.unix(), "seconds");
            }
            return diffWeeks(startDate, endDate) * timeSpent / 24 / 60;
        })
    );
    return (
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
    );
}

function Year({index, numWeeks, events}: {index: number, numWeeks: number, events: number[]}) {
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

function Week({index, events}: {index: number, events: number[]}) {
    const colors = [
        "bg-black",
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-purple-500"
    ];
    let color = "";
    let sum = [...events].reduce((a, b) => a + b, 0);
    for (let i = events.length-1; i > -1; --i) {
        if (index < sum) {
            color = colors[i];
        }
        sum -= events[i];
    }
    return (
        <td className={`p-1.5 border border-black rounded-sm ${color}`}/>
    )
}