import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import TableHead from "@mui/material/TableHead/TableHead";
import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import Table from "@mui/material/Table/Table";
import TableBody from "@mui/material/TableBody/TableBody";
import dayjs from "dayjs";
import { EventMenu } from "./EventMenu";

export function ActivityList() {
    const {activities, setActivities, birthDate} = useContext(UserContext);
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = () => {
        setActivities([...activities]);
        handleClose();
    }
    const deleteHandler = (index: number) => () => {
        activities.splice(index, 1);
        setActivities([...activities]);
        handleClose();
    };

    const today = dayjs();
    
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell/>
                    <TableCell>Activity</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {birthDate.unix() < today.unix() && (
                    <TableRow className="flex items-end gap-4">
                        <TableCell>
                            <div className="rounded-full h-6 aspect-square" style={{backgroundColor: "#444"}}/>
                        </TableCell>
                        <TableCell>Weeks Lived</TableCell>
                    </TableRow>
                )}
                {activities.map((activity, index) => {
                    return (
                        <>
                            <EventMenu 
                                edit={true} 
                                open={open} 
                                onClose={handleClose} 
                                activity={activity} 
                                onSubmit={handleSubmit}
                                onDelete={deleteHandler(index)}
                            />
                            <TableRow onClick={handleOpen} className="flex items-end gap-4 hover:bg-[#333] cursor-pointer">
                                <TableCell>
                                    <div className="rounded-full h-6 aspect-square" style={{backgroundColor: activity.color}}/>
                                </TableCell>
                                <TableCell>{activity.name}</TableCell>
                            </TableRow>
                        </>
                    )
                })}
                <TableRow className="flex items-end gap-4">
                    <TableCell>
                        <div className="h-6 aspect-square rounded-full border-2 border-[#888]"/>
                    </TableCell>
                    <TableCell>Weeks Left</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}