import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WorkIcon from '@mui/icons-material/Work';
import CampaignIcon from '@mui/icons-material/Campaign';
import FeedIcon from '@mui/icons-material/Feed';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../../redux/userSlice";

const Sidebar = () => {
    const dispatch=useDispatch()
    const logout = async () => {
        let username="";
        let tockenX="";
        window.localStorage.setItem("TOCKEN", JSON.stringify(tockenX))
        let tocken = JSON.parse(window.localStorage.getItem("TOCKEN"))
        dispatch(update({username,tocken}))
    }

    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">CETadmin</span>
                </Link>

            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">LIST</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/job" style={{ textDecoration: "none" }}>
                        <li>
                            <WorkIcon className="icon" />
                            <span>Jobs</span>
                        </li>
                    </Link>
                    <Link to="/announcement" style={{ textDecoration: "none" }}>
                        <li>
                            <CampaignIcon className="icon" />
                            <span>Announcements</span>
                        </li>
                    </Link>
                    <Link to="/job" style={{ textDecoration: "none" }}>
                        <li>
                            <FeedIcon className="icon" />
                            <span>Applications</span>
                        </li>
                    </Link>
                    <Link to="/alumni" style={{ textDecoration: "none" }}>
                        <li>
                            <Diversity3Icon className="icon" />
                            <span>Alumni</span>
                        </li>
                    </Link>
                    <p className="title">USEFULL</p>
                    <li>
                        <AutoStoriesIcon className="icon" />
                        <span>Resources</span>
                    </li>
                    <p className="title">USER</p>
                    <li onClick={()=>logout()}>
                        <LogoutIcon className="icon" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            {/* <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div> */}
        </div>
    )
}

export default Sidebar