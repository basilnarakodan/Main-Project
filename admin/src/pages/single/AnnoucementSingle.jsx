import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import UserList from "../../components/table/UserList"
import "./single.scss"
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';
import staticImageService from "../../services/staticImageService";
import logo from "../../assets/images/no-image.png"

const AnnouncementSingle = () => {
    const { state } = useLocation();

    const [announcements, setAnnouncements] = useState(state.job);

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButton">
                            <EditIcon className="icon" />
                            Edit
                        </div>
                        <h1 className="title">Details</h1>
                        <div className="item">
                            <img
                                src={announcements.images.poster?staticImageService.getPoster(announcements.images.poster):logo}
                                alt=""
                                className="itemimg"
                            />
                            <div>
                                <div className="details">
                                    <div className="detailItem">
                                        <span className="itemKey">Id: </span>
                                        <span className="itemValue">{announcements.id}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Title: </span>
                                        <span className="itemValue">{announcements.title}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Subject: </span>
                                        <span className="itemValue">{announcements.subject}</span>
                                    </div>
                                    </div>
                                    <div className="details">
                                    <div className="detailItem">
                                        <span className="itemKey">Location: </span>
                                        <span className="itemValue">{announcements.location}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Date & Time: </span>
                                        <span className="itemValue">{announcements.date}{" "}{announcements.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    {/* <h1 className="title">Poster</h1> */}
                    <div className="poster">
                        <img
                            src={staticImageService.getPoster(announcements.images.poster)}
                            alt=""
                            className="itemimg"
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AnnouncementSingle