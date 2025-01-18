import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import TableCell from "@mui/material/TableCell/TableCell";
import TableRow from "@mui/material/TableRow/TableRow";
import dayjs from "dayjs";

export function WeeksLived() {
    const {birthDate} = useContext(UserContext);
    const today = dayjs();

    return birthDate.unix() < today.unix() && (
        <TableRow>
            <TableCell>
                <div className="rounded-full h-6 aspect-square" style={{backgroundColor: "#444"}}/>
            </TableCell>
            <TableCell>Weeks Lived</TableCell>
            <TableCell className="!hidden md:!table-cell"/>
            <TableCell className="!hidden lg:!table-cell"/>
            <TableCell className="!hidden lg:!table-cell"/>
            <TableCell className="!hidden xl:!table-cell"/>
        </TableRow>
    );
}

export function WeeksLeft() {
    return (
        <TableRow>
            <TableCell>
                <div className="h-6 aspect-square rounded-full border-2 border-[#888]"/>
            </TableCell>
            <TableCell>Weeks Left</TableCell>
            <TableCell className="!hidden md:!table-cell"/>
            <TableCell className="!hidden lg:!table-cell"/>
            <TableCell className="!hidden lg:!table-cell"/>
            <TableCell className="!hidden xl:!table-cell"/>
        </TableRow>
    );
}