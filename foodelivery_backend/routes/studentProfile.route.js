var express = require("express");
const {
  getStudentProfile,
  editStudentProfile
} = require("../sevices/studentProfile.service")
var router = express.Router();

router.get("/:username", async (req, res) => {
  let username = req?.params?.username;
  let response = await getStudentProfile(username);
  res.json(response);
});

router.post('/editProfile', async (req, res, next) => {
  let user = req.body;
  console.log(user)
  let response = await editStudentProfile(user);
  res.json(response);
});

module.exports = router;