var express = require("express");
const {
    getAllAnnouncement,
} = require("../sevices/announcement.service")
var router = express.Router();

router.get("/", async (req, res) => {
  let response = await getAllAnnouncement();
  res.json(response);
});

module.exports = router;