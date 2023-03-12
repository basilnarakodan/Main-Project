import axios from "axios";
import { ApiConstants } from "../constants";

const AuthRequest = axios.create({
    baseURL: ApiConstants.BACKEND_API.BASE_API_URL,
});

const register = async (user) => {
    if (!user?.username || !user?.email || !user?.password) {
        return { status: false, message: "Please fill up all the fields" };
    }
    try {
        let requestBody = {
            username: user?.username,
            email: user?.email,
            password: user?.password,
        };
        console.log("hi", ApiConstants.BACKEND_API.BASE_API_URL,)
        let registerResponse = await AuthRequest.post(
            ApiConstants.BACKEND_API.REGISTER,
            requestBody,
        );
        console.log(registerResponse?.data);
        return registerResponse?.data;
    } catch (error) {
        console.log(error)
        return { status: false, message: "Oops! Something went wrong" };
    }
}

const login = async (user) => {
    if (!user?.username || !user?.password) {
        return { status: false, message: "Please fill up all the fields" };
    }
    try {
        let requestBody = {
            username: user?.username,
            password: user?.password,
        };
        console.log("hi", ApiConstants.BACKEND_API.BASE_API_URL,)
        let loginResponse = await AuthRequest.post(
            ApiConstants.BACKEND_API.LOGIN,
            requestBody,
        );
        console.log(loginResponse?.data);
        return loginResponse?.data;
    } catch (error) {
        console.log(error)
        return { status: false, message: "Oops! Something went wrong" };
    }
}

const checkUserExist = async (type,value) => {
    try {
        let params={[type]:value}
        let userCheckResponse = await AuthRequest.get(
            ApiConstants.BACKEND_API.USER_EXIST,
            {params},
        );
        console.log(userCheckResponse?.data);
        return userCheckResponse?.data;
    } catch (error) {
        console.log(error)
        return { status: false, message: "Oops! Something went wrong" };
    }
}

export default { register,login,checkUserExist }