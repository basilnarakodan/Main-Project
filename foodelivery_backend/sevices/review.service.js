const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");

const getAllReviews = async () => {
  try {
    let reviews = await MongoDB.db
      .collection(mongoConfig.collections.REVIEW)
      .find()
      .toArray();

    if (reviews && reviews?.length > 0) {
      return {
        status: true,
        message: "reviews found successfully",
        data: reviews,
      };
    } else {
      return {
        status: false,
        message: "No reviews found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "reviews finding failed",
      error: `reviews finding failed : ${error?.message}`,
    };
  }
};

const addReview = async (data) => {
    try {
        if (!data?.name || !data?.company || !data?.review)
            return { status: false, message: "Please fill up all the fields" };
        let userObject = {
            id:"44",
            name: data?.name,
            company: data?.company,
            review: data?.review,
        };

        let savedUser = await MongoDB.db
            .collection(mongoConfig.collections.REVIEW)
            .insertOne(userObject);

        if (savedUser?.acknowledged && savedUser?.insertedId) {
            return {
                status: true,
                message: "review added successfully",
                data: savedUser,
            };
        } else {
            return {
                status: false,
                message: "review added failed",
            };
        }

    } catch (error) {
        console.log(error);
        let errorMessage = "review added failed";
        return {
            status: false,
            message: errorMessage,
            error: error?.toString(),
        };
    }
};

const getReviewByCompany = async (company) => {
  try {
    let Reviews = await MongoDB.db
      .collection(mongoConfig.collections.REVIEW)
      .find({company}).sort({ date: 1, time: 1 }).toArray();
    
    if (Reviews && Reviews?.length > 0) {
      return {
        status: true,
        message: "Reviews found successfully",
        data: Reviews,
      };
    } else {
      return {
        status: false,
        message: "No Reviews found",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Reviewsfinding failed",
      error: `Reviews finding failed : ${error?.message}`,
    };
  }
};

module.exports = {getAllReviews,addReview,getReviewByCompany};