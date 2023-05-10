import { useState, useEffect } from "react"
import Datatable from "../../components/datatable/Datatable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"
import staticImageService from "../../services/staticImageService";
import { getUsers } from "../../services/userService"

const userColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'username', headerName: 'username', width: 120 },
    { field: 'email', headerName: 'email', width: 120 },
    { field: 'register_number', headerName: 'Register Number', width: 140 },
    { field: 'first_name', headerName: 'First Name', width: 100 },
    { field: 'last_name', headerName: 'Last Name', width: 100 },
    { field: 'gender', headerName: 'gender', width: 70 },
    { field: 'dob', headerName: 'DOB', width: 80 },
    { field: 'course', headerName: 'Course', width: 60 },
    { field: 'stream', headerName: 'Stream', width: 140 },
    { field: 'phone', headerName: 'Phone', width: 110 },
]

const UserList = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {

        getUsers().then(response => {
            if (response?.status) {
                // console.log(response)
                setUser(response?.data);
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
                    Users
                </div>
                <Datatable col={userColumns} row={user}  name={"userList"} noaction={false}/>
            </div>
        </div>
    )
}

export default UserList