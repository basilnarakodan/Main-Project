import { useState, useEffect } from "react"
import Datatable from "../../components/datatable/Datatable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"
import staticImageService from "../../services/staticImageService";
import { getAnnouncements } from "../../services/announcementService"
import { Link } from "react-router-dom";
import logo from "../../assets/images/no-image.png"

const userColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'title', headerName: 'Title', width: 200,
        renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.images.poster?staticImageService.getPoster(params.row.images.poster):logo} alt="" />
                    {params.row.title}
                </div>

            )
        }
    },
    { field: 'subject', headerName: 'Subject', width: 180 },
    { field: 'location', headerName: 'Location', width: 180 },
    // { field: 'location', headerName: 'Location', width: 200 },
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'time', headerName: 'Time', width: 100 },
]

const AnnouncementList = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {

        getAnnouncements().then(response => {
            if (response?.status) {
                // console.log(response)
                setAnnouncements(response?.data);
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
                    Add New Announcement
                    <Link to="/announcement/new" className="link">
                        Add New
                    </Link>
                </div>
                <Datatable col={userColumns} row={announcements}  name={"announcementList"}/>
            </div>
        </div>
    )
}

export default AnnouncementList