const { mongoConfig, tockenSecret } = require("../config");
const MongoDB = require("./mongodb.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const getCount = async () => {
    try {
        let userCount = await MongoDB.db
            .collection(mongoConfig.collections.USERS)
            .countDocuments()
        let jobCount = await MongoDB.db
            .collection(mongoConfig.collections.JOBS)
            .countDocuments()
        let announcementCount = await MongoDB.db
            .collection(mongoConfig.collections.ANNOUNCEMENTS)
            .countDocuments()
        let alumniCount = await MongoDB.db
            .collection(mongoConfig.collections.ALUMNI)
            .countDocuments()
        let count = {
            userCount,
            jobCount,
            announcementCount,
            alumniCount
        }
        if (count) {
            return {
                status: true,
                message: "count found successfully",
                data: count,
            };
        } else {
            return {
                status: false,
                message: "No count found",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "count finding failed",
            error: `count finding failed : ${error?.message}`,
        };
    }
};

const deleteJobById = async (id) => {
    try {
        let job = await MongoDB.db
            .collection(mongoConfig.collections.JOBS)
            .deleteOne({ id })

        if (job) {
            return {
                status: true,
                message: "job deleted successfully",
                data: job,
            };
        } else {
            return {
                status: false,
                message: "No job deleted",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "job deleting failed",
            error: `job deleting failed : ${error?.message}`,
        };
    }
};

const deleteAnnouncementById = async (id) => {
    try {
        let job = await MongoDB.db
            .collection(mongoConfig.collections.ANNOUNCEMENTS)
            .deleteOne({ id })

        if (job) {
            return {
                status: true,
                message: "announcement deleted successfully",
                data: job,
            };
        } else {
            return {
                status: false,
                message: "No announcement deleted",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "announcement deleting failed",
            error: `announcement deleting failed : ${error?.message}`,
        };
    }
};

const deleteUserById = async (id) => {
    try {
        let job = await MongoDB.db
            .collection(mongoConfig.collections.USERS)
            .deleteOne({ id })

        if (job) {
            return {
                status: true,
                message: "user deleted successfully",
                data: job,
            };
        } else {
            return {
                status: false,
                message: "No user deleted",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: "user deleting failed",
            error: `user deleting failed : ${error?.message}`,
        };
    }
};

const addJob = async (state) => {
    try {
        let savedUser = await MongoDB.db
            .collection(mongoConfig.collections.JOBS)
            .insertOne(state);

        if (savedUser?.acknowledged && savedUser?.insertedId) {
            // let tocken = jwt.sign(
            //     { username: userObject?.username, email: userObject?.email },
            //     tockenSecret,
            //     { expiresIn: '24h' })

            return {
                status: true,
                message: "Job registered successfully",
                data: savedUser,
            };
        } else {
            return {
                status: false,
                message: "Job register failed",
            };
        }

    } catch (error) {
        console.log(error);
        let errorMessage = "Job register failed";
        return {
            status: false,
            message: errorMessage,
            error: error?.toString(),
        };
    }
};

const addAnnouncement = async (announcement) => {
    try {
        let savedUser = await MongoDB.db
            .collection(mongoConfig.collections.ANNOUNCEMENTS)
            .insertOne(announcement);

        if (savedUser?.acknowledged && savedUser?.insertedId) {
            // let tocken = jwt.sign(
            //     { username: userObject?.username, email: userObject?.email },
            //     tockenSecret,
            //     { expiresIn: '24h' })

            return {
                status: true,
                message: "announcement registered successfully",
                data: savedUser,
            };
        } else {
            return {
                status: false,
                message: "announcement register failed",
            };
        }

    } catch (error) {
        console.log(error);
        let errorMessage = "announcement register failed";
        return {
            status: false,
            message: errorMessage,
            error: error?.toString(),
        };
    }
};

const adminLogin = async (user) => {
    try {
      if (!user?.username || !user?.password) {
        return {
          status: false,
          message: "Please fill up all the fields"
        };
      }
  
      const userObject = await MongoDB.db
        .collection(mongoConfig.collections.ADMIN)
        .findOne({ username: user?.username });
  
      if (!userObject) {
        return {
          status: false,
          message: "No admin found",
        };
      }
  
      const isPasswordValid = await bcrypt.compare(user?.password, userObject?.password);
  
      if (userObject.username === "admin" && isPasswordValid) {
        const token = jwt.sign(
          { username: userObject?.username, email: userObject?.email },
          tockenSecret,
          { expiresIn: '90d' }
        );
  
        return {
          status: true,
          message: "Admin login successfull",
          data: token,
        };
      } else {
        return {
          status: false,
          message: "Incorrect username or password",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: "Admin login failed",
        error: error?.toString(),
      };
    }
  };


module.exports = { getCount, deleteJobById, deleteAnnouncementById, adminLogin, deleteUserById, addJob, addAnnouncement };
