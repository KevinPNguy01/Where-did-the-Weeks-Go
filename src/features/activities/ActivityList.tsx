import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TableHead from "@mui/material/TableHead/TableHead";
import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import { EditableActivity } from "./EditableActivity";
import { WeeksLeft, WeeksLived } from "./NonEditableActivity";

export function ActivityList() {
    const {activities} = useContext(UserContext);
    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell/>
                    <TableCell>Activity</TableCell>
                    <TableCell>Time Spent</TableCell>
                    <TableCell className="!hidden md:!table-cell">From</TableCell>
                    <TableCell className="!hidden md:!table-cell">To</TableCell>
                    <TableCell className="!hidden lg:!table-cell"/>
                </TableRow>
            </TableHead>
            <TableBody>
                <WeeksLived/>
                {activities.map((activity, index) => <EditableActivity key={index} activity={activity} index={index}/>)}
                <WeeksLeft/>
            </TableBody>
        </Table>
    )
}