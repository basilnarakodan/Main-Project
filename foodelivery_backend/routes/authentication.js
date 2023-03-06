var express = require('express');
var router = express.Router();

router.post('/register', function(req, res, next) {
    const body=req.body;
    console.log(body);
    res.json(body);
});

module.exports = router;
