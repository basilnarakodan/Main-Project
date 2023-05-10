import { useState, useEffect } from "react"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Widget from "../../components/widget/Widget"
import List from "../../components/table/Table"
import "./home.scss"
import { getJobs } from "../../services/jobService"
import { getCount } from "../../services/adminService"
import store from '../../redux/store'
import { useDispatch } from "react-redux"
import { update } from "../../redux/userSlice";

const getTocken = () => store.getState().user.tocken;

const Home = ({ navigation }) => {

    const [jobs, setJobs] = useState([]);
    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        getJobs().then(response => {
            if (response?.status) {
                // console.log(response)
                setJobs(response?.data);
                // console.log(jobs)
            }
        })
        getCount().then(response => {
            if (response?.status) {
                // console.log(response)
                setCount(response?.data);
                // console.log(count)
            }
        })
    }, [getTocken()])

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user" count={count.userCount} />
                    <Widget type="jobs" count={count.jobCount} />
                    <Widget type="announcement" count={count.announcementCount} />
                    <Widget type="alumni" count={count.alumniCount} />
                </div>
                <div className="listContainer">
                    <div className="listTitle">All Jobs</div>
                    <List jobs={jobs} />

                </div>
            </div>
        </div>
    )
}

export default Home