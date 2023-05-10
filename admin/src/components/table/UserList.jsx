import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import staticImageService from "../../services/staticImageService";

const UserList = ({ jobs }) => {

    console.log(jobs);
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell className="tableCell">Sl No.</TableCell> */}
                        <TableCell className="tableCell">Register Number</TableCell>
                        <TableCell className="tableCell">Name</TableCell>
                        <TableCell className="tableCell">Gender</TableCell>
                        <TableCell className="tableCell">DOB</TableCell>
                        <TableCell className="tableCell">Course</TableCell>
                        <TableCell className="tableCell">Stream</TableCell>
                        <TableCell className="tableCell">Mobile</TableCell>
                        <TableCell className="tableCell">Email</TableCell>
                        <TableCell className="tableCell">HSC %</TableCell>
                        <TableCell className="tableCell">SSC %</TableCell>
                        <TableCell className="tableCell">Degree %</TableCell>
                        <TableCell className="tableCell">PG %</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        jobs[0].users.map((row) => (
                            <TableRow
                                key={row.id}>
                                <TableCell className="tableCell">{row.register_number}</TableCell>
                                {/* <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src={staticImageService.getLogo(row.images.logo)} alt="" className="image" />
                                    {row.company}
                                </div>
                            </TableCell> */}
                                <TableCell className="tableCell">{row.first_name}{" "}{row.last_name} </TableCell>
                                <TableCell className="tableCell">{row.gender}</TableCell>
                                <TableCell className="tableCell">{row.dob}</TableCell>
                                <TableCell className="tableCell">{row.course}</TableCell>
                                <TableCell className="tableCell">{row.stream}</TableCell>
                                <TableCell className="tableCell">{row.phone}</TableCell>
                                <TableCell className="tableCell">{row.email}</TableCell>
                                <TableCell className="tableCell">{row.hsc_percentage}</TableCell>
                                <TableCell className="tableCell">{row.ssc_percentage}</TableCell>
                                <TableCell className="tableCell">{row.degree_percentage}</TableCell>
                                <TableCell className="tableCell">{row.pg_percentage}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default UserList