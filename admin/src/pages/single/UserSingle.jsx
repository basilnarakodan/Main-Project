import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./userSingle.scss"
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';
import staticImageService from "../../services/staticImageService";
import { getAppliedJob } from "../../services/jobService"
import List from "../../components/table/Table";

const UserSingle = () => {

    const { state } = useLocation();
    const [userDetail, setUserDetail] = useState(state.job);
    const [appliedJob, setAppliedJob] = useState();
    useEffect(() => {

        getAppliedJob(userDetail.register_number).then(response => {
            if (response?.status) {
                // console.log(response?.data)
                setAppliedJob(response?.data);
                // setAppliedJobCount(response?.count?.appliedJobs)
                // setAllJobCount(response?.count?.allJobs)
                // console.log(jobs)
            }
        })
}, [])
console.log(appliedJob);
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
                        {/* <img
                                src={staticImageService.getLogo(jobDetail.images.logo)}
                                alt=""
                                className="itemimg"
                            /> */}
                        <div className="leftorg">
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Username: </span>
                                    <span className="itemValue">{userDetail.username}</span>
                                </div>

                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">First Name: </span>
                                    <span className="itemValue">{userDetail.first_name}</span>
                                </div>

                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Last Name: </span>
                                    <span className="itemValue">{userDetail.last_name}</span>
                                </div>

                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Register Number: </span>
                                    <span className="itemValue">{userDetail.register_number}</span>
                                </div>

                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Email: </span>
                                    <span className="itemValue">{userDetail.email}</span>
                                </div>

                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Phone: </span>
                                    <span className="itemValue">{userDetail.phone}</span>
                                </div>
                            </div>
                            <div className="details">
                                <span style={{ paddingBottom: 20, paddingTop: 20, fontSize: 18, fontWeight: "bold", textDecoration: "underline", color: "#838383" }}>Mark Details</span>
                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">HSC CGPA : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.hsc_cgpa}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">HSC Percentage : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.hsc_percentage}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">HSC Passing Year : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.hsc_passing_year}</span>
                                </div>
                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">SSC CGPA : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.ssc_cgpa}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">SSC Percentage : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.ssc_percentage}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">SSC Passing Year : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.ssc_passing_year}</span>
                                </div>
                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Degree CGPA : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.degree_cgpa}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Degree Percentage : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.degree_percentage}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Degree Passing Year : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.degree_passing_year}</span>
                                </div>
                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">PG CGPA : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.pg_cgpa}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">PG Percentage : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.pg_percentage}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">PG Passing Year : </span>
                                    <br />
                                    <span className="itemValue">{userDetail.pg_passing_year}</span>
                                </div>
                            </div>
                        </div>
                        <div className="rightorg">
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Gender: </span>
                                    <span className="itemValue">{userDetail.gender}</span>
                                </div>
                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">City : </span>
                                    <span className="itemValue">{userDetail.city}</span>
                                </div>
                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Country: </span>
                                    <span className="itemValue">{userDetail.country}</span>
                                </div>
                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Course: </span>
                                    <span className="itemValue">{userDetail.course}</span>
                                </div>
                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Stream: </span>
                                    <span className="itemValue">{userDetail.stream}</span>
                                </div>
                            </div>
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Active Backlog: </span>
                                    <span className="itemValue">{userDetail.active_backlog}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="bottom">
                <h1 className="title">Applications</h1>
                {appliedJob ?
                        <List jobs={appliedJob} />
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

export default UserSingle