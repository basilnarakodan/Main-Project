import axios from 'axios';
import ApiConstants from "../constants/ApiConstants";
import store from '../redux/store';

const getTocken = () => store.getState().user.tocken;

const getJobs = async () => {
  console.log(`JobsService | getJobs`);
  try {
    let jobResponse = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.JOB}`,
      {
        headers: {Authorization:getTocken()}
      },
    );
    if (jobResponse?.status === 200) {
      return {
        status: true,
        message: `Job data fetched`,
        data: jobResponse?.data?.data,
      };
    } else {
      return {
        status: false,
        message: `Job data not found1`,
      };
    }
  } catch (error) {
    console.log(error)
    return {
      status: false,
      message: `Job data not found2`,
    };
  }
};

const getAppliedJobByUser = async id => {
  console.log(`JobsService | getOneJobById`);
  try {
    let userResponse = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.JOB}/appliedJobs/user/${id}`,
      {
        headers: {Authorization:getTocken()}
      },
    );
    if (userResponse?.status === 200) {
      return {
        status: true,
        message: `user data fetched`,
        data: userResponse?.data,
      };
    } else {
      return {
        status: false,
        message: `user data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `user data not found`,
    };
  }
};

const getAppliedJob = async register_number => {
  console.log(`JobsService | getAppliedJob Service`);
  try {
    let jobResponse = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.JOB}/appliedJobs/${register_number}`,
      {
        headers: {Authorization:getTocken()}
      },
    );
    if (jobResponse?.status === 200) {
      return {
        status: true,
        message: `Applied Job data fetched`,
        data: jobResponse?.data?.data,
        count: jobResponse?.data?.count,
      };
    } else {
      return {
        status: false,
        message: `Applied Job data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Applied Job data not found`,
    };
  }
};

export { getJobs, getAppliedJobByUser, getAppliedJob };