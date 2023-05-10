import axios from 'axios';
import ApiConstants from "../constants/ApiConstants";
import store from '../redux/store';

const getTocken = () => store.getState().user.tocken;

const getAnnouncements = async () => {
    console.log(`AnnouncementsService | getAnnouncements`);
    try {
      let announcementResponse = await axios.get(
        `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.ANNOUNCEMENT}`,
        {
          headers: {Authorization:getTocken()}
      },
      );
      if (announcementResponse?.status === 200) {
        return {
          status: true,
          message: `Announcement data fetched`,
          data: announcementResponse?.data?.data
        };
      } else {
        return {
          status: false,
          message: `Announcement data not found1`,
        };
      }
    } catch (error) {
      console.log(error)
      return {
        status: false,
        message: `Announcement data not found2`,
      };
    }
  };
  
  export {getAnnouncements};