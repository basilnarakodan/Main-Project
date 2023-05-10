import axios from 'axios';
import ApiConstants from "../constants/ApiConstants";
import store from '../redux/store';

const getTocken = () => store.getState().user.tocken;

const AuthRequest = axios.create({
    baseURL: ApiConstants.BACKEND_API.BASE_API_URL,
});

const getCount = async () => {
    console.log(`AdminService | getCount`);
    try {
        let countResponse = await axios.get(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.ADMIN}`,
            {
                headers: {Authorization:getTocken()}
            },
        );
        if (countResponse?.status === 200) {
            return {
                status: true,
                message: `Count data fetched`,
                data: countResponse?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `Count data not found1`,
            };
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: `Count data not found2`,
        };
    }
};

const deleteJobById = async id => {
    console.log(`AdminService | deleteJobById`);
    try {
        let deleteResponse = await axios.delete(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.ADMIN}/job/${id}`,
            {
                headers: {Authorization:getTocken()}
            },
        );
        if (deleteResponse?.status === 200) {
            return {
                status: true,
                message: `Job delete data fetched`,
                data: deleteResponse?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `Job delete data not found`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Job delete data not found`,
        };
    }
};

const deleteAnnouncementById = async id => {
    console.log(`AdminService | deleteAnnouncementById`);
    try {
        let deleteResponse = await axios.delete(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.ADMIN}/announcement/${id}`,
            {
                headers: {Authorization:getTocken()}
            },
        );
        if (deleteResponse?.status === 200) {
            return {
                status: true,
                message: `Announcement delete data fetched`,
                data: deleteResponse?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `Announcement delete data not found`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Announcement delete data not found`,
        };
    }
};

const deleteUserById = async id => {
    console.log(`AdminService | deleteUserById`);
    try {
        let deleteResponse = await axios.delete(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.ADMIN}/user/${id}`,
            {
                headers: {Authorization:getTocken()}
            },
        );
        if (deleteResponse?.status === 200) {
            return {
                status: true,
                message: `user delete data fetched`,
                data: deleteResponse?.data?.data,
            };
        } else {
            return {
                status: false,
                message: `user delete data not found`,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `user delete data not found`,
        };
    }
};

const addJob = async (state) => {
    try {
        let requestBody = {
            id: state?.Id,
            company: state?.Company,
            role: state?.role,
            location: state?.location,
            ctc: state?.CTC,
            type: state?.type,
            images: { logo: state?.images?.logo },
            experiance: state?.Experiance,
            branch: [state?.Branch],
            percentage: state?.Percentage,
            cgpa: state?.CGPA,
            backlog: state?.Backlog,
            note: state?.Note,
            about_job: state?.About_job,
            about_company: state?.About_Company,
            requirments: state?.Requirments,
            last_date: state?.last_date,
        };
        let registerResponse = await AuthRequest.post(
            `${ApiConstants.BACKEND_API.ADMIN}/newjob`,
            requestBody,
        );
        console.log(registerResponse?.data);
        return registerResponse?.data;
    } catch (error) {
        console.log(error)
        return { status: false, message: "Oops! Something went wrong" };
    }
}

const addAnnoucement = async (announcement) => {
    try {
        let requestBody = {
            id: announcement?.Id,
            title: announcement?.title,
            subject: announcement?.subject,
            images: { poster: announcement?.images?.poster },
            location: announcement?.location,
            date: announcement?.date,
            time: announcement?.time,
        };
        let registerResponse = await AuthRequest.post(
            `${ApiConstants.BACKEND_API.ADMIN}/newannouncement`,
            requestBody,
        );
        console.log(registerResponse?.data);
        return registerResponse?.data;
    } catch (error) {
        console.log(error)
        return { status: false, message: "Oops! Something went wrong" };
    }
}

const adminlogin = async (admin) => {
    if (!admin?.username || !admin?.password) {
        return { status: false, message: "Please fill up all the fields" };
    }
    try {
        let requestBody = {
            username: admin?.username,
            password: admin?.password,
        };
        let loginResponse = await AuthRequest.post(
            `${ApiConstants.BACKEND_API.ADMIN}/adminlogin`,
            requestBody,
        );
        console.log(loginResponse?.data);
        return loginResponse?.data;
    } catch (error) {
        console.log(error)
        return { status: false, message: "Oops! Something went wrong" };
    }
}

const editStudentProfileImg = async (formData) => {
    console.log(`EditStudentProfileService | EditStudentProfileImg`);
    // console.log("service",formData); 
    try {

        let uploadResponse = await axios.post(
            `${ApiConstants.BACKEND_API.BASE_API_URL}/admin/adminupload`, formData,
            {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    headers: {Authorization:getTocken()}
                }
            })

        // console.log(editProfileResponse?.data);
        return uploadResponse?.data;
    } catch (error) {
        console.log(error)
        return { status: false, message: "Oops! Something went wrong" };
    }
}

const editStudentPosterImg = async (formData) => {
    console.log(`EditStudentProfileService | EditStudentProfileImg`);
    // console.log("service",formData); 
    try {

        let uploadResponse = await axios.post(
            `${ApiConstants.BACKEND_API.BASE_API_URL}/admin/adminuploadposter`, formData,
            {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    headers: {Authorization:getTocken()}
                }
            })

        // console.log(editProfileResponse?.data);
        return uploadResponse?.data;
    } catch (error) {
        console.log(error)
        return { status: false, message: "Oops! Something went wrong" };
    }
}

export { getCount, deleteJobById,editStudentPosterImg, deleteAnnouncementById, deleteUserById, addJob, addAnnoucement, adminlogin, editStudentProfileImg };