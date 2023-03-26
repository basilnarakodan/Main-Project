const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken");
// const config = require("../config");

const getStudentProfile = async (username) => {
    try {
      let profile = await MongoDB.db
        .collection(mongoConfig.collections.STUDENTPROFILE)
        .findOne({username})

      if (profile) {
        return {
          status: true,
          message: "studentProfile found successfully",
          data: profile,
        };
      } else {
        return {
          status: false,
          message: "No studentProfile found",
        };
      }
    } catch (error) {
      return {
        status: false,
        message: "studentProfile finding failed",
        error: `studentProfile finding failed : ${error?.message}`,
      };
    }
  };

  const editStudentProfile = async (user) => {
    try {
        let userObject = {
            username: user?.username,
            first_name: user?.first_name,
            last_name:user?.last_name,
            phone:user?.phone,
            email: user?.email,
            gender:user?.gender,
            dob:user?.dob,
            country:user?.country,
            city:user?.city,
            institution_name:user?.institution_name,
            register_number:user?.register_number,
            course:user?.course,
            stream:user?.stream,
            active_backlog:user?.active_backlog,
            hsc_percentage:user?.hsc_percentage,
            hsc_cgpa:user?.hsc_cgpa,
            hsc_passing_year:user?.hsc_passing_year,
            ssc_percentage:user?.ssc_percentage,
            ssc_cgpa:user?.ssc_cgpa,
            ssc_passing_year:user?.ssc_passing_year,
            degree_percentage:user?.degree_percentage,
            degree_cgpa:user?.degree_cgpa,
            degree_passing_year:user?.degree_passing_year,
            pg_percentage:user?.pg_percentage,
            pg_cgpa:user?.pg_cgpa,
            pg_passing_year:user?.pg_passing_year
        };
// console.log(userObject)
        let savedUser = await MongoDB.db
            .collection(mongoConfig.collections.USERS)
            .updateOne({username:userObject?.username},{
                $set:{
                    first_name:userObject?.first_name,
                    last_name:userObject?.last_name,
                    phone:userObject?.phone,
                    email: userObject?.email,
                    gender:userObject?.gender,
                    dob:userObject?.dob,
                    country:userObject?.country,
                    city:userObject?.city,
                    institution_name:userObject?.institution_name,
                    register_number:userObject?.register_number,
                    course:userObject?.course,
                    stream:userObject?.stream,
                    active_backlog:userObject?.active_backlog,
                    hsc_percentage:userObject?.hsc_percentage,
                    hsc_cgpa:userObject?.hsc_cgpa,
                    hsc_passing_year:userObject?.hsc_passing_year,
                    ssc_percentage:userObject?.ssc_percentage,
                    ssc_cgpa:userObject?.ssc_cgpa,
                    ssc_passing_year:userObject?.ssc_passing_year,
                    degree_percentage:userObject?.degree_percentage,
                    degree_cgpa:userObject?.degree_cgpa,
                    degree_passing_year:userObject?.degree_passing_year,
                    pg_percentage:userObject?.pg_percentage,
                    pg_cgpa:userObject?.pg_cgpa,
                    pg_passing_year:userObject?.pg_passing_year
                }
            });

        if (savedUser?.acknowledged) {
            return {
                status: true,
                message: "profile updated successfully",
                data: savedUser,
            };
        } else {
            return {
                status: false,
                message: "profile updated failed",
            };
        }

    } catch (error) {
        console.log(error);
        let errorMessage = "profile updated failed";
        return {
            status: false,
            message: errorMessage,
            error: error?.toString(),
        };
    }
};

module.exports = {getStudentProfile,editStudentProfile };
