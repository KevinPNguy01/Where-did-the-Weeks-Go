export function Calendar() {
    const lifeExpectancy = 77.43;
    const start = new Date(2004, 0, 21);
    const today = new Date();
    const dateBefore = Date.UTC(0, today.getMonth(), today.getDate()) < Date.UTC(0, start.getMonth(), start.getDate());
    const yearsPassed = today.getFullYear() - start.getFullYear() - (dateBefore ? 1: 0);
    const weeksPassed = Math.floor((today.getTime() - new Date(today.getFullYear() - (dateBefore ? 1 : 0), start.getMonth(), start.getDate()).getTime()) / (1000 * 60 * 60 * 24 * 7));
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
        <td className={`p-1.5 rounded-sm bg-red-500 ${index < events[0] ? "bg-black" : "bg-green-500"}`}/>
    )
}