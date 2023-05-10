var express = require("express");
const {
  getAllReviews,
  addReview,
  getReviewByCompany
} = require("../sevices/review.service")
var router = express.Router();

router.get("/", async (req, res) => {
  let response = await getAllReviews();
  res.json(response);
});

router.post('/addreview', async (req, res, next) => {
  let data = req.body;
  console.log(data)
  let response = await addReview(data);
  res.json(response);
});

router.get("/:company", async (req, res) => {
  let company = req?.params?.company;
  let response = await getReviewByCompany(company);
  res.json(response);
});

module.exports = router;