import { useState, useEffect } from "react"
import Datatable from "../../components/datatable/Datatable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"
import staticImageService from "../../services/staticImageService";
import { getAlumnis } from "../../services/alumniService"

const userColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'register_number', headerName: 'Register Number', width: 150 },
    {
        field: 'name', headerName: 'Name', width: 150,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={staticImageService.getLogo(params.row.images.logo)} alt="avatar" />
                    {params.row.name}
                </div>

            )
        }
    },
    { field: 'course', headerName: 'Course', width: 80 },
    { field: 'stream', headerName: 'Stream', width: 150 },
    { field: 'passing_year', headerName: 'Passing Year', width: 90 },
    { field: 'placed_company', headerName: 'Placed Company', width: 120 },
    { field: 'joined_company', headerName: 'Joined Company', width: 120 },
    { field: 'linkedInUrl', headerName: 'linkedIn Url', width: 100 },
]

const AlumniList = () => {
    const [alumni, setAlumni] = useState([]);

    useEffect(() => {

        getAlumnis().then(response => {
            if (response?.status) {
                // console.log(response)
                setAlumni(response?.data);
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
                    Alumni List
                </div>
                <Datatable col={userColumns} row={alumni} noaction={true} name={"alumniList"} />
            </div>
        </div>
    )
}

export default AlumniList