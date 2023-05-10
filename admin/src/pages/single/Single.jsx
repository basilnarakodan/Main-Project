import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import UserList from "../../components/table/UserList"
import "./single.scss"
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react"
import { getAppliedJobByUser } from "../../services/jobService"
import { useLocation } from 'react-router-dom';
import staticImageService from "../../services/staticImageService";
import Datatable from "../../components/datatable/Datatable";
import logo from "../../assets/images/no-image.png"

const userColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'register_number', headerName: 'Register Number', width: 140 },
    { field: 'first_name', headerName: 'First Name', width: 100 },
    { field: 'last_name', headerName: 'Last Name', width: 100 },
    { field: 'gender', headerName: 'gender', width: 70 },
    { field: 'dob', headerName: 'DOB', width: 80 },
    { field: 'course', headerName: 'Course', width: 60 },
    { field: 'stream', headerName: 'Stream', width: 140 },
    { field: 'phone', headerName: 'Phone', width: 110 },
    { field: 'email', headerName: 'email', width: 120 },
    { field: 'hsc_percentage', headerName: 'HSC %', width: 60 },
    { field: 'ssc_percentage', headerName: 'SSC %', width: 60 },
    { field: 'degree_percentage', headerName: 'Degree %', width: 60 },
    { field: 'pg_percentage', headerName: 'PG %', width: 60 },
]

const Single = () => {
    const { state } = useLocation();
    // console.log("location", state.job);
    const [jobDetail, setJobDetail] = useState(state.job);
    const [users, setUsers] = useState();
    console.log(jobDetail);
    useEffect(() => {

        getAppliedJobByUser(jobDetail.id).then(response => {
            if (response?.status) {
                // console.log(response)
                setUsers(response?.data?.data);
                // console.log(jobs)
            }
        })
    }, [])

    // console.log(users[0].users);
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
                                src={jobDetail.images.logo?staticImageService.getLogo(jobDetail.images.logo):logo}
                                alt=""
                                className="itemimg"
                            />
                            <div>
                                <div className="details">
                                    <div className="detailItem">
                                        <span className="itemKey">Company: </span>
                                        <span className="itemValue">{jobDetail.company}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Role: </span>
                                        <span className="itemValue">{jobDetail.role}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">CTC: </span>
                                        <span className="itemValue">{jobDetail.ctc}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">location: </span>
                                        <span className="itemValue">{jobDetail.location}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Type: </span>
                                        <span className="itemValue">{jobDetail.type}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Experiance: </span>
                                        <span className="itemValue">{jobDetail.experiance}</span>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="detailItem">
                                        <span className="itemKey">Branch : </span>
                                        <span className="itemValue">{jobDetail.branch.join(",")}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Backlog Criteria: </span>
                                        <span className="itemValue">{jobDetail.backlog}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Min Percentage : </span>
                                        <span className="itemValue">{jobDetail.percentage}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Last Date : </span>
                                        <span className="itemValue">{jobDetail.last_date}</span>
                                    </div>
                                    <div className="detailItem">
                                        <span className="itemKey">Posted on : </span>
                                        <span className="itemValue">{jobDetail.job_post_date}</span>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="detailItem">
                                        <span className="itemKey">Note : </span>
                                        <br />
                                        <span className="itemValue">{jobDetail.note}</span>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="detailItem">
                                        <span className="itemKey">About Job : </span>
                                        <br />
                                        <span className="itemValue">{jobDetail.about_job}</span>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="detailItem">
                                        <span className="itemKey">About Company : </span>
                                        <br />
                                        <span className="itemValue">{jobDetail.about_company}</span>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="detailItem">
                                        <span className="itemKey">Requirements : </span>
                                        <br />
                                        <span className="itemValue">{jobDetail.requirments}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Applications</h1>
                    {users ?
                        <Datatable row={users[0].users} col={userColumns} name={"userList"} noaction={true}/>
                        : <span
                            style={{
                                paddingBottom: 80,
                                paddingLeft: 15,
                                fontSize: 20,
                            }}
                        >No Applications</span>}
                </div>
            </div>
        </div >
    )
}

export default Single