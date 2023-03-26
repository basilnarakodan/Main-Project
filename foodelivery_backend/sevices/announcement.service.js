const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getAllAnnouncement = async () => {
  try {
    let announcements = await MongoDB.db
      .collection(mongoConfig.collections.ANNOUNCEMENTS)
      .find()
      .toArray();

    if (announcements && announcements?.length > 0) {
      return {
        status: true,
        message: "announcements found successfully",
        data: announcements,
      };
    } else {
      return {
        status: false,
        message: "No announcements found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "announcements finding failed",
      error: `announcements finding failed : ${error?.message}`,
    };
  }
};

module.exports = {getAllAnnouncement};