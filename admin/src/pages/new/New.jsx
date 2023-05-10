import { useState } from "react";
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./new.scss"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { addJob, addAnnoucement, editStudentProfileImg,editStudentPosterImg } from "../../services/adminService";

const New = ({ inputs, title, id }) => {

    const [file, setFile] = useState();
    const [file1, setFile1] = useState();
    const [annoucement, setAnnoucement] = useState({
        Id: "",
        title: "",
        subject: "",
        images: { poster: "" },
        location: "",
        date: "",
        time: "",
    })
    const [state, setState] = useState({
        Id: "",
        Company: "",
        role: "",
        location: "",
        CTC: "",
        type: "",
        images: { logo: "" },
        Experiance: "",
        Branch: "",
        Percentage: "",
        CGPA: "",
        Backlog: "",
        Note: "",
        About_job: "",
        About_Company: "",
        Requirments: "",
        last_date: "",
    })

    function handleChange(evt) {
        const value = evt.target.value;
        if (id === 1) {
            setState({
                ...state,
                [evt.target.name]: value
            });
        }
        else if (id === 0) {
            setAnnoucement({
                ...annoucement,
                [evt.target.name]: value
            });
        }
    }

    const handlePhoto = (e) => {
        setFile(e.target.files[0]);
        if (id === 1) {
            const name=e.target.files[0].name.split(".")[0].split(" ").join("");
            console.log(name);
            setState({
                ...state,
                images: {
                    logo: name
                }
            })
        }
        else if (id === 0) {
            const name=e.target.files[0].name.split(".")[0].split(" ").join("");
            setAnnoucement({
                ...annoucement,
                images: {
                    poster: name
                }
            })
        }
    }
    // const handleAttachment = (e) => {
    //     setFile1(e.target.files[0]);
    //     console.log(e.target.files[0].name);
    // }

    const submit = (e) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append("image", file)

        // formData.append("image", file1)
        // console.log(...formData);

        

        if (id === 1) {
            editStudentProfileImg(formData).then(response => {
                console.log(response)
                if (!response?.status) {
                    console.log(response)
                }
            })
            addJob(state).then(response => {
                console.log(response)
                if (!response?.status) {
                    console.log(response);
                }
            })

        } else if (id === 0) {
            editStudentPosterImg(formData).then(response => {
                console.log(response)
                if (!response?.status) {
                    console.log(response)
                }
            })
            addAnnoucement(annoucement).then(response => {
                console.log(response)
                if (!response?.status) {
                    console.log(response);
                }
            })
        }
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={file ? URL.createObjectURL(file) : "https://previews.123rf.com/images/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg"}
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Upload Logo:
                                    {/* <DriveFolderUploadIcon className="icon" /> */}
                                </label>
                                <input name={state.Company} type="file" id="file" accept=".png, .jpg" onChange={handlePhoto} />
                            </div>
                            {inputs.map(input => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        required
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        name={input.label}
                                        value={id ? state[`${input.label}`] : annoucement[`${input.label}`]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}

                            <div className="formInput">
                                {/* <label htmlFor="attachments"> */}
                                    {/* Upload Attachments: */}
                                    {/* <DriveFolderUploadIcon className="icon" /> */}
                                {/* </label> */}
                                {/* <input name={state.Company} type="file" id="attachments" onChange={handleAttachment} /> */}
                            </div>
                            
                            <button onClick={() => submit()}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default New