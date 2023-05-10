import axios from 'axios';
import ApiConstants from "../constants/ApiConstants";
import store from '../redux/store';

const getTocken = () => store.getState().user.tocken;

const getUsers = async () => {
    console.log(`UserService | getUsers`);
    try {
        let userResponse = await axios.get(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.USER}/allusers`,
            {
                headers: {Authorization:getTocken()}
            },
        );
        if (userResponse?.status === 200) {
            return {
                status: true,
                message: `user data fetched`,
                data: userResponse?.data?.data
            };
        } else {
            return {
                status: false,
                message: `user data not found1`,
            };
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: `user data not found2`,
        };
    }
};

export { getUsers };