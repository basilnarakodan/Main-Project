import { ApiConstants } from '../constants';
import axios from 'axios';
import { authHeader } from '../utils/Generator';
import { getToken } from '../Store';

const AuthRequest = axios.create({
  baseURL: ApiConstants.BACKEND_API.BASE_API_URL,
  headers: authHeader(getToken()),
});

const getReview = async () => {
  console.log(`ReviewService | getReview`);
  try {
    let Response = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.REVIEW}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (Response?.status === 200) {
      return {
        status: true,
        message: `Review data fetched`,
        data: Response?.data?.data
      };
    } else {
      return {
        status: false,
        message: `Review data not found1`,
      };
    }
  } catch (error) {
    console.log(error)
    return {
      status: false,
      message: `Review data not found2`,
    };
  }
};

const addReview = async (data) => {
  console.log(`ReviewService | addReview`);
  if (!data?.name || !data?.company || !data?.review) {
    return { status: false, message: "Please fill up all the fields" };
  }
  try {
    let Response = await AuthRequest.post(
      `${ApiConstants.BACKEND_API.REVIEW}/addreview`,
      data,
    );
    console.log(Response?.data);
    return Response?.data;
  } catch (error) {
    console.log(error)
    return { status: false, message: "Oops! Something went wrong" };
  }
}

const getReviewByCompany = async company => {
  console.log(`ReviewService | getReviewByCompany`);
  try {
    let Response = await axios.get(
      `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.REVIEW}/${company}`,
      {
        headers: authHeader(getToken()),
      },
    );
    if (Response?.status === 200) {
      return {
        status: true,
        message: `Review data fetched`,
        data: Response?.data,
      };
    } else {
      return {
        status: false,
        message: `Review data not found`,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: `Review data not found`,
    };
  }
};

export default { getReview, addReview,getReviewByCompany };