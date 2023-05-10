import { useState, useEffect } from "react"
import Datatable from "../../components/datatable/Datatable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"
import { getJobs } from "../../services/jobService"
import staticImageService from "../../services/staticImageService";
import { Link } from "react-router-dom";
import logo from "../../assets/images/no-image.png"

const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'Company', headerName: 'Company', width: 200, renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.images.logo ? staticImageService.getLogo(params.row.images.logo) : logo} alt="" />
                    {params.row.company}
                </div>

            )
        }
    },
    { field: 'ctc', headerName: 'CTC', width: 80 },
    { field: 'role', headerName: 'Role', width: 180 },
    // { field: 'location', headerName: 'Location', width: 200 },
    { field: 'branch', headerName: 'Branch', width: 200 },
    { field: 'last_date', headerName: 'Last Date', width: 100 },
]

const List = () => {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        getJobs().then(response => {
            if (response?.status) {
                // console.log(response)
                setJobs(response?.data);
                // console.log(jobs)
            }
        })
    }, [])

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="dataTableTitle">
                    Add New Job
                    <Link to="/job/new" className="link">
                        Add New
                    </Link>
                </div>
                <Datatable col={userColumns} row={jobs} name={"jobList"} />
            </div>
        </div>
    )
}

export default List