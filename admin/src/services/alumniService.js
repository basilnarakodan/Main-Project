import axios from 'axios';
import ApiConstants from "../constants/ApiConstants";
import store from '../redux/store';

const getTocken = () => store.getState().user.tocken;

const getAlumnis = async () => {
    console.log(`AlumnisService | getAlumnis`);
    try {
        let alumniResponse = await axios.get(
            `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.ALUMNI}`,
            {
                headers: {Authorization:getTocken()}
            },
        );
        if (alumniResponse?.status === 200) {
            return {
                status: true,
                message: `Alumni data fetched`,
                data: alumniResponse?.data?.data
            };
        } else {
            return {
                status: false,
                message: `Alumni data not found1`,
            };
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: `Alumni data not found2`,
        };
    }
};

export { getAlumnis };