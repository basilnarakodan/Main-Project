import "./widget.scss"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import { Link } from "react-router-dom";

const Widget = ({ type,count }) => {

    //temporary
    // const count = 101;

    let data;
    switch (type) {
        case "user":
            data = {
                title: "USERS",
                link: "See all users",
                route: "/users",
                icon: (
                    <PersonOutlineOutlinedIcon
                        className="icon"
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255,0,0,0.2)"
                        }}
                    />
                )
            };
            break;
        case "jobs":
            data = {
                title: "JOBS",
                link: "View all jobs",
                route: "/job",
                icon: <WorkOutlineOutlinedIcon className="icon" style={{
                    color: "goldenrod",
                    backgroundColor: "rgba(218,165,32,0.2)"
                }} />
            };
            break;
        case "announcement":
            data = {
                title: "ANNOUNCEMENT",
                link: "View all announcements",
                route: "/announcement",
                icon: <CampaignOutlinedIcon className="icon" style={{
                    color: "green",
                    backgroundColor: "rgba(0,128,0,0.2)"
                }} />
            };
            break;
        case "alumni":
            data = {
                title: "ALUMNI",
                link: "See all alumni",
                route: "/alumni",
                icon: <Diversity3OutlinedIcon className="icon" style={{
                    color: "purple",
                    backgroundColor: "rgba(128,0,128,0.2)"
                }} />
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{count}</span>
                <Link to={data.route} style={{ textDecoration: "none",color:"teal" }}>
                    <span className="link">{data.link}</span>
                </Link>
            </div>
            <div className="right">
                <div className="percentage">

                </div>
                {data.icon}

            </div>
        </div>
    )
}

export default Widget