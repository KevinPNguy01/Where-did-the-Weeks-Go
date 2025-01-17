import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TableHead from "@mui/material/TableHead/TableHead";
import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton/IconButton";
import { EditEventButton } from "./EditEventButton";

export function ActivityList() {
    const {activities, setActivities, birthDate} = useContext(UserContext);
    const today = dayjs();

    const deleteHandler = (index: number) => () => {
        activities.splice(index, 1);
        setActivities([...activities]);
    };
    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell/>
                    <TableCell>Activity</TableCell>
                    <TableCell>Time Spent</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell/>
                    <TableCell/>
                </TableRow>
            </TableHead>
            <TableBody>
                {birthDate.unix() < today.unix() && (
                    <TableRow className="flex items-end gap-4">
                        <TableCell>
                            <div className="rounded-full h-6 aspect-square" style={{backgroundColor: "#444"}}/>
                        </TableCell>
                        <TableCell>Weeks Lived</TableCell>
                        <TableCell>24 hrs</TableCell>
                        <TableCell>{birthDate.format("MMM DD, YYYY")}</TableCell>
                        <TableCell>Now</TableCell>
                        <TableCell/>
                        <TableCell/>
                    </TableRow>
                )}
                {activities.map(({color, name, start, end, timeSpent, everyday}, index) => {
                    const hours = timeSpent.hour();
                    const hoursText = `${hours} hr${hours > 1 ? "s" : ""}`;
                    const minutes = timeSpent.minute();
                    const minutesText = minutes > 0 ? ` min${minutes > 1 ? "s" : ""}` : "";
                    return (
                        <TableRow className="flex items-end gap-4">
                            <TableCell>
                                <div className="rounded-full h-6 aspect-square" style={{backgroundColor: color}}/>
                            </TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{`${hoursText}${minutesText}`}</TableCell>
                            <TableCell>{(everyday || start.unix() < today.unix()) ? "Now" : start.format("MMM DD, YYYY")}</TableCell>
                            <TableCell>{everyday ? "Forever" : end.format("MMM DD, YYYY")}</TableCell>
                            <TableCell>
                                <EditEventButton activity={activities[index]}/>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={deleteHandler(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                })}
                <TableRow className="flex items-end gap-4">
                    <TableCell>
                        <div className="h-6 aspect-square rounded-full border-2 border-[#888]"/>
                    </TableCell>
                    <TableCell>Weeks Left</TableCell>
                    <TableCell/>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell/>
                    <TableCell/>
                </TableRow>
            </TableBody>
        </Table>
    )
}