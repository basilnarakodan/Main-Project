import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import staticImageService from "../../services/staticImageService";
import logo from "../../assets/images/no-image.png"

const List = ({ jobs }) => {
console.log("jobs",jobs);
if(jobs==undefined){
    jobs="";
    console.log(jobs);
}
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">JobId</TableCell>
                        <TableCell className="tableCell">Company</TableCell>
                        <TableCell className="tableCell">Role</TableCell>
                        <TableCell className="tableCell">Location</TableCell>
                        <TableCell className="tableCell">CTC</TableCell>
                        <TableCell className="tableCell">Branch</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.length > 0 ? jobs.map((row) => (
                        <TableRow
                            key={row.id}>
                            <TableCell className="tableCell">{row.id}</TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src={row.images.logo ? staticImageService.getLogo(row.images.logo) : logo} alt="" className="image" />
                                    {row.company}
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">{row.role}</TableCell>
                            <TableCell className="tableCell">{row.location}</TableCell>
                            <TableCell className="tableCell">{row.ctc}</TableCell>
                            <TableCell className="tableCell">{row.branch}</TableCell>
                        </TableRow>
                    )) : <div className="msg"><span className="aaa">No jobs</span></div>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default List