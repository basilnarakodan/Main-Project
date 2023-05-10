import "./login.scss"
import { useEffect } from "react";
import { useState } from "react"
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { adminlogin } from "../../services/adminService";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        let tocken = JSON.parse(window.localStorage.getItem("TOCKEN"))
        if (tocken != null) {
            dispatch(update({ username, tocken }))
        }
    }, [])

    let admin = {
        username,
        password
    }
    const signIn = async (e) => {
        e.preventDefault()
        adminlogin(admin).then(response => {
            if (response?.status) {
                let tockenX = `Bearer ${response?.data}`;
                window.localStorage.setItem("TOCKEN", JSON.stringify(tockenX))
                let tocken = JSON.parse(window.localStorage.getItem("TOCKEN"))
                dispatch(update({ username, tocken }))
            } else {
                setErrorMessage(response?.message);
                console.log("err",errorMessage);
            }
        });
    }

    return (
        <>
            <div className="navbar">
                <div className="wrapper">
                    <div className="mainTitle">
                        CETadmin
                    </div>
                    <div className="items">
                        <div className="item">
                            <LanguageIcon className="icon" />
                            English
                        </div>
                        <div className="item">
                            <DarkModeIcon className="icon" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="form-group-mt-3">
                            <label>Username</label><br />
                            <input
                                required
                                type="text"
                                name="username"
                                className="form-control mt-1"
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group-mt-3">
                            <label>Password</label><br />
                            <input
                                required
                                type="password"
                                name="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p className="error">{errorMessage}</p>

                        <div className="d-grid gap-2 mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={(e) => signIn(e)}
                            >
                                Sign in
                            </button>
                        </div>
                        <p className="forgot-password-text-right-mt-2">
                            Forgot <a href="">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login