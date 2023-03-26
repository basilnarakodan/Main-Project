const MondoDB = require("./mongodb.service")
const { mongoConfig, tockenSecret } = require("../config")

const getUserData = async (username) => {
    try {
        let userObject = await MondoDB.db
            .collection(mongoConfig.collections.USERS)
            .findOne({ username });

        if (userObject) {
            return {
                status: true,
                message: "User found successfull",
                data: userObject,
            };
        } else {
            return {
                status: false,
                message: "No user found",
            };
        }
    } catch (error) {
        return{
            status:false,
            message:"User finding failed",
            error:`User finding failed:${error?.message}`
        };
    }
}

module.exports={getUserData}