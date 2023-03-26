const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getAllJob = async () => {
  try {
    let jobs = await MongoDB.db
      .collection(mongoConfig.collections.JOBS)
      .find()
      .sort({ date: -1, time: -1 })
      .toArray();

    if (jobs && jobs?.length > 0) {
      return {
        status: true,
        message: "jobs found successfully",
        data: jobs,
      };
    } else {
      return {
        status: false,
        message: "No jobs found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "jobs finding failed",
      error: `jobs finding failed : ${error?.message}`,
    };
  }
};

const getOneJobById = async (id) => {
  try {
    let job = await MongoDB.db
      .collection(mongoConfig.collections.JOBS)
      .findOne({ id })

    if (job) {
      return {
        status: true,
        message: "job found successfully",
        data: job,
      };
    } else {
      return {
        status: false,
        message: "No job found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "job finding failed",
      error: `job finding failed : ${error?.message}`,
    };
  }
};

// For todays date;
Date.prototype.today = function () {
  return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
}
// For the time now
Date.prototype.timeNow = function () {
  return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}

const applyJob = async (user) => {
  try {
    var newDate = new Date();
    let userObject = {
      id: user?.id,
      company: user?.company,
      role: user?.role,
      ctc: user?.ctc,
      location: user?.location,
      branch: user?.branch,
      images: user?.images,
      username: user?.username,
      register_number: user?.register_number,
      date: newDate.today(),
      time: newDate.timeNow(),
    };
    let savedUser = await MongoDB.db
      .collection(mongoConfig.collections.JOBAPPLICATIONS)
      .insertOne(userObject);

    if (savedUser?.acknowledged) {
      return {
        status: true,
        message: "job applied successfully",
        data: savedUser,
      };
    } else {
      return {
        status: false,
        message: "job applied failed",
      };
    }

  } catch (error) {
    console.log(error);
    let errorMessage = "job applied failed";
    return {
      status: false,
      message: errorMessage,
      error: error?.toString(),
    };
  }
};

const getAppliedJobs = async (register_number) => {
  try {
    let AppliedJobs = await MongoDB.db
      .collection(mongoConfig.collections.JOBAPPLICATIONS)
      .find({ register_number }).sort({ date: -1, time: -1 }).toArray();
    // .aggregate([
    //   {
    //     '$match': {
    //       'register_number': register_number
    //     }
    //   }, {
    //     '$lookup': {
    //       'from': 'jobs',
    //       'localField': 'jobId',
    //       'foreignField': 'id',
    //       'as': 'appliedJobs'
    //     }
    //   }
    // ]);
    let countAppliedJobs = await MongoDB.db
      .collection(mongoConfig.collections.JOBAPPLICATIONS)
      .countDocuments()
    let countAllJobs = await MongoDB.db
      .collection(mongoConfig.collections.JOBS)
      .countDocuments()
    let jobCount={
      allJobs:countAllJobs,
      appliedJobs:countAppliedJobs,
    }
    if (AppliedJobs && AppliedJobs?.length > 0) {
      return {
        status: true,
        message: "Applied jobs found successfully",
        data: AppliedJobs,
        count:jobCount,
      };
    } else {
      return {
        status: false,
        message: "No Applied jobs found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Applied jobs finding failed",
      error: `Applied jobs finding failed : ${error?.message}`,
    };
  }
};

const getAppliedJobById = async (id) => {
  try {
    let job = await MongoDB.db
      .collection(mongoConfig.collections.JOBAPPLICATIONS)
      .findOne({ id })

    if (job) {
      return {
        status: true,
        message: "Applied job found successfully",
        data: job,
      };
    } else {
      return {
        status: false,
        message: "No Applied job found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Applied job finding failed",
      error: `Applied job finding failed : ${error?.message}`,
    };
  }
};

module.exports = { getAllJob, getOneJobById, applyJob, getAppliedJobs,getAppliedJobById };
