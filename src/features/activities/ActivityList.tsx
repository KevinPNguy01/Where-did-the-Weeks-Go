import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import TableHead from "@mui/material/TableHead/TableHead";
import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton/IconButton";

export function ActivityList() {
    const {activities, setActivities} = useContext(UserContext);
    const today = dayjs();

    const deleteHandler = (index: number) => () => {
        activities.splice(index, 1);
        setActivities([...activities]);
    };
    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Activity</TableCell>
                    <TableCell>Time Spent</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell/>
                    <TableCell/>
                </TableRow>
            </TableHead>
            <TableBody>
                {activities.map(({name, start, end, timeSpent, everyday}, index) => {
                    const hours = Math.floor(timeSpent / 60);
                    const minutes = timeSpent % 60;
                    return (
                        <TableRow className="flex items-end gap-4">
                            <TableCell>{name}</TableCell>
                            <TableCell>{`${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${minutes > 1 ? "s" : ""}`}</TableCell>
                            <TableCell>{(everyday || start.unix() < today.unix()) ? "Now" : start.format("MMM DD, YYYY")}</TableCell>
                            <TableCell>{everyday ? "Forever" : end.format("MMM DD, YYYY")}</TableCell>
                            <TableCell>
                                <IconButton>
                                    <EditIcon/>
                                </IconButton>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={deleteHandler(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}