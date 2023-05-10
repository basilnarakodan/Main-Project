import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search" />
                    <SearchIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageIcon className="icon" />
                        English
                    </div>
                    <div className="item">
                        <DarkModeIcon className="icon" />
                    </div>
                    <div className="item">
                        <img
                            src="https://www.nj.com/resizer/iqV2J-QFgh0227ybHBor4exTVBk=/800x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
                            alt=""
                            className="avatar"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar