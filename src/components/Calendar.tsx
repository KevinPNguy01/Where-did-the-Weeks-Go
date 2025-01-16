import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export function Calendar() {
    const {birthDate, lifeExpectancy} = useContext(UserContext);

    const today = new Date();
    const dateBefore = Date.UTC(0, today.getMonth(), today.getDate()) < Date.UTC(0, birthDate.getMonth(), birthDate.getDate());
    const yearsPassed = today.getFullYear() - birthDate.getFullYear() - (dateBefore ? 1: 0);
    const weeksPassed = Math.floor((today.getTime() - new Date(today.getFullYear() - (dateBefore ? 1 : 0), birthDate.getMonth(), birthDate.getDate()).getTime()) / (1000 * 60 * 60 * 24 * 7));
    const currentWeekIndex = 52 * yearsPassed + weeksPassed;
    return (
        <table className="border-separate">
            <tbody>
                {Array.from({length: Math.floor(lifeExpectancy)}).map((_, rowIndex) => {
                    return (
                        <Year index={rowIndex} key={rowIndex} numWeeks={52} events={[currentWeekIndex]}/>
                    );
                })}
                <Year index={Math.floor(lifeExpectancy)} numWeeks={Math.floor((lifeExpectancy % 1) * 52)} events={[currentWeekIndex]}/>
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
    return (
        <td className={`p-1.5 rounded-sm ${index < events[0] ? "bg-black" : "bg-green-500"}`}/>
    )
}