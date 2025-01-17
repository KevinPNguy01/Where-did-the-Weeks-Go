import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import TableHead from "@mui/material/TableHead/TableHead";
import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import dayjs from "dayjs";

export function ActivityList() {
    const {activities} = useContext(UserContext);
    const today = dayjs();
    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Activity</TableCell>
                    <TableCell>Time Spent</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {activities.map(({name, start, end, timeSpent, everyday}) => {
                    const hours = Math.floor(timeSpent / 60);
                    const minutes = timeSpent % 60;
                    return (
                        <TableRow className="flex items-end gap-4">
                            <TableCell>{name}</TableCell>
                            <TableCell>{`${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${minutes > 1 ? "s" : ""}`}</TableCell>
                            <TableCell>{(everyday || start.unix() < today.unix()) ? "Now" : start.format("MMM DD, YYYY")}</TableCell>
                            <TableCell>{everyday ? "Forever" : end.format("MMM DD, YYYY")}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}