const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getAllAlumni = async () => {
  try {
    let alumnis = await MongoDB.db
      .collection(mongoConfig.collections.ALUMNI)
      .find()
      .toArray();

    if (alumnis && alumnis?.length > 0) {
      return {
        status: true,
        message: "alumnis found successfully",
        data: alumnis,
      };
    } else {
      return {
        status: false,
        message: "No alumnis found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "alumnis finding failed",
      error: `alumnis finding failed : ${error?.message}`,
    };
  }
};

module.exports = {getAllAlumni};