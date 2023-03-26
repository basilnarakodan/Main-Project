import { ApiConstants } from '../constants';
import axios from 'axios';
import {authHeader} from '../utils/Generator';
import {getToken} from '../Store';

// const AuthRequest = axios.create({
//   baseURL: ApiConstants.BACKEND_API.BASE_API_URL,
// });

const getStudentProfile = async username => {
    console.log(`StudentProfileService | getStudentProfile`);
    try {
      let studentProfileResponse = await axios.get(
        `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.STUDENTPROFILE}/${username}`,
        {
          headers: authHeader(getToken()),
        },
      );
      if (studentProfileResponse?.status === 200) {
        return {
          status: true,
          message: `StudentProfile data fetched`,
          data: studentProfileResponse?.data?.data,
        };
      } else {
        return {
          status: false,
          message: `StudentProfile data not found`,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: `StudentProfile data not found`,
      };
    }
  };
  
  const editStudentProfile = async (user) => {
    console.log(`EditStudentProfileService | EditStudentProfile`);
    try {
        let requestBody = {
          username: user?.username,
          first_name: user?.firstName,
          last_name:user?.lastName,
          phone:user?.phone,
          email: user?.email,
          gender:user?.gender,
          dob:user?.dob,
          country:user?.country,
          city:user?.city,
          institution_name:user?.college,
          register_number:user?.registerNumber,
          course:user?.course,
          stream:user?.stream,
          active_backlog:user?.activeBacklog,
          hsc_percentage:user?.hscPercentage,
          hsc_cgpa:user?.hscCgpa,
          hsc_passing_year:user?.hscPassingYear,
          ssc_percentage:user?.sscPercentage,
          ssc_cgpa:user?.sscCgpa,
          ssc_passing_year:user?.sscPassingYear,
          degree_percentage:user?.degreePercentage,
          degree_cgpa:user?.degreeCgpa,
          degree_passing_year:user?.degreePassingYear,
          pg_percentage:user?.pgPercentage,
          pg_cgpa:user?.pgCgpa,
          pg_passing_year:user?.pgPassingYear
        };
        let editProfileResponse = await axios.post(
          `${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.STUDENTPROFILE}/editProfile`,
            requestBody,
            {
              headers: authHeader(getToken()),
            },
        );
        // console.log(editProfileResponse?.data);
        return editProfileResponse?.data;
    } catch (error) {
        console.log(error)
        return { status: false, message: "Oops! Something went wrong" };
    }
}


  export default {getStudentProfile,editStudentProfile};