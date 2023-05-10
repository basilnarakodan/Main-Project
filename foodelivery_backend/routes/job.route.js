var express = require("express");
const {
  getAllJob,
  getOneJobById,
  applyJob,
  getAppliedJobs,
  getAppliedJobById,
  getJobByBranch,
  getAppliedJobByUser
} = require("../sevices/job.service")
var router = express.Router();

router.get("/", async (req, res) => {
  let response = await getAllJob();
  res.json(response);
});

router.get("/branch/:branch", async (req, res) => {
  let branch = req?.params?.branch;
  let response = await getJobByBranch(branch);
  res.json(response);
});


router.get("/:id", async (req, res) => {
  console.log(req?.params)
  let id = req?.params?.id;
  let response = await getOneJobById(id);
  res.json(response);
});

router.post('/apply', async (req, res, next) => {
  let user = req.body;
  console.log(user)
  let response = await applyJob(user);
  res.json(response);
});

router.get("/appliedJobs/:register_number", async (req, res) => {
  let register_number = req?.params?.register_number;
  let response = await getAppliedJobs(register_number);
  res.json(response);
});

router.get("/appliedJobDetails/:id", async (req, res) => {
  let id = req?.params?.id;
  let response = await getAppliedJobById(id);
  res.json(response);
});

router.get("/appliedJobs/user/:register_number", async (req, res) => {
  let register_number = req?.params?.register_number;
  let response = await getAppliedJobByUser(register_number);
  res.json(response);
});

module.exports = router;