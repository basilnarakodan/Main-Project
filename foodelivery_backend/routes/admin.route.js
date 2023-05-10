var express = require("express");
const { getCount, deleteJobById, deleteAnnouncementById, deleteUserById, addJob, addAnnouncement, adminLogin } = require("../sevices/admin.service");
var router = express.Router();
const multer = require("multer");

//image logo upload
const storage = multer.diskStorage({
    destination: "static/images/logo",
    filename: function (req, file, cb) {
        //   cb(null,  req.username + "." + file.originalname.split(".").pop());
        cb(null, file.originalname.split(" ").join(""));
    },
});

const diskStorage = multer({ storage: storage });

router.post('/adminupload', diskStorage.array('image'), (req, res) => {
    console.log("Upload Hit");
    req.files.map(item => console.log(item.filename))
    if (!req.files) {
        res.send({ code: 500, msg: "err" })
    } else {
        res.send({ code: 10, msg: "upload success" })
    }
})

//image poster upload
const posterstorage = multer.diskStorage({
    destination: "static/images/poster/hd",
    filename: function (req, file, cb) {
        //   cb(null,  req.username + "." + file.originalname.split(".").pop());
        cb(null, file.originalname.split(" ").join(""));
    },
});

const diskStorage2 = multer({ storage: posterstorage });

router.post('/adminuploadposter', diskStorage2.array('image'), (req, res) => {
    console.log("Upload Hit");
    req.files.map(item => console.log(item.filename))
    if (!req.files) {
        res.send({ code: 500, msg: "err" })
    } else {
        res.send({ code: 10, msg: "upload success" })
    }
})

router.get("/", async (req, res) => {
    let response = await getCount();
    res.json(response);
});

router.post('/adminlogin', async (req, res, next) => {
    let body = req.body;
    let response = await adminLogin(body);
    res.json(response);
});

router.post('/newjob',  async (req, res, next) => {
    let body = req.body;
    let response = await addJob(body);
    res.json(response);
});

router.post('/newannouncement', async (req, res, next) => {
    let body = req.body;
    console.log(body)
    let response = await addAnnouncement(body);
    res.json(response);
    res.render('/announcement');
});

router.delete("/job/:id", async (req, res) => {
    let id = req?.params?.id;
    let response = await deleteJobById(id);
    res.json(response);
});

router.delete("/announcement/:id", async (req, res) => {
    let id = req?.params?.id;
    let response = await deleteAnnouncementById(id);
    res.json(response);
});

router.delete("/user/:id", async (req, res) => {
    let id = req?.params?.id;
    let response = await deleteUserById(id);
    res.json(response);
});

module.exports = router;