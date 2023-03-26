import { ApiConstants } from '../constants';
import axios from 'axios';
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';

const getJobs = async () => {
  console.log(`JobsService | getJobs`);
  try {
    let jobResponse = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.JOB}`,
      {
        headers: authHeader(getToken()),
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

const getOneJobById = async id => {
  console.log(`JobsService | getOneJobById`);
  try {
    let jobResponse = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.JOB}/${id}`,
      {
        headers: authHeader(getToken()),
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
        message: `Job data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Job data not found`,
    };
  }
};

const applyJob = async (user) => {
  console.log(`job service | applyJob service`);
  try {
    let requestBody = {
      id: user?.id,
      company: user?.company,
      role: user?.role,
      ctc: user?.ctc,
      location: user?.location,
      branch: user?.branch,
      images: user?.images,
      username: user?.username,
      register_number: user?.register_number
    };
    let applyJobResponse = await axios.post(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.JOB}/apply`,
      requestBody,
      {
        headers: authHeader(getToken()),
      },
    );
    // console.log(applyJobResponse?.data);
    return applyJobResponse?.data;
  } catch (error) {
    console.log(error)
    return { status: false, message: "Oops! Something went wrong" };
  }
}


const getAppliedJob = async register_number => {
  console.log(`JobsService | getAppliedJob Service`);
  try {
    let jobResponse = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.JOB}/appliedJobs/${register_number}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (jobResponse?.status === 200) {
      return {
        status: true,
        message: `Applied Job data fetched`,
        data: jobResponse?.data?.data,
        count:jobResponse?.data?.count,
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

const getAppliedJobById = async id => {
  console.log(`JobsService | getOneJobById`);
  try {
    let jobResponse = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.JOB}/appliedJobDetails/${id}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (jobResponse?.status === 200) {
      return {
        status: true,
        message: `Job data fetched`,
        data: jobResponse?.data,
      };
    } else {
      return {
        status: false,
        message: `Job data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Job data not found`,
    };
  }
};

export default { getJobs, getOneJobById, applyJob,getAppliedJob,getAppliedJobById };