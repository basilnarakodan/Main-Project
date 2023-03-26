var express = require("express");
const {
    getAllAlumni
} = require("../sevices/alumni.service")
var router = express.Router();

router.get("/", async (req, res) => {
  let response = await getAllAlumni();
  res.json(response);
});

module.exports = router;