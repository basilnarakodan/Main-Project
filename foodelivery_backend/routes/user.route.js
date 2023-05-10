var express = require('express');
const { getUserData,getAllUsers } = require('../sevices/user.service');
var router = express.Router();

router.get('/get-user', async(req, res, next)=> {
    let username=req?.username
    let response=await getUserData(username)
    res.json(response)
});

router.get("/allusers", async (req, res) => {
    let response = await getAllUsers();
    res.json(response);
  });

module.exports = router;
