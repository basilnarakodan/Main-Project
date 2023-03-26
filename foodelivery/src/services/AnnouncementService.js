import { ApiConstants } from '../constants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

const getAnnouncements = async () => {
  console.log(`AnnouncementsService | getAnnouncements`);
  try {
    let announcementResponse = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.ANNOUNCEMENT}`,
      {
        headers: authHeader(getToken()),
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

export default {getAnnouncements};