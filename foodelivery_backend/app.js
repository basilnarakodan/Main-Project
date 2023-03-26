var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authenticationRouter = require('./routes/authentication');
var userRouter = require('./routes/user.route');
var restaurantRouter = require('./routes/restaurant.route');
var jobRouter = require('./routes/job.route');
var announcementRouter = require('./routes/announcement.route');
var alumniRouter = require('./routes/alumni.route');
var studentProfileRouter = require('./routes/studentProfile.route');

const MondoDB=require("./sevices/mongodb.service");

MondoDB.connectToMongoDB();

var app = express();
var cors = require('cors');
app.use(cors());

//image upload and for api for last of this page
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const multer=require('multer')
const upload=multer({dest: 'static/'})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('static'));


app.use("*",require("./sevices/authentication.service").tokenVerification); //now all api goes through this

app.use('/', indexRouter);
app.use('/api', authenticationRouter);
app.use('/api/user', userRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/job', jobRouter);
app.use('/api/announcement', announcementRouter);
app.use('/api/alumni', alumniRouter);
app.use('/api/studentProfile', studentProfileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  res.header( "Access-Control-Allow-Origin" );

});


app.get('/get', function(req, res, next) {
  console.log("Hello")
  res.json({ "title": 'Express' });
});

//image api
app.post('/upload',upload.single('file'),(req,res)=>{
  console.log(req.file)
  if(!req.file){
    res.send({code:500,msg:"err"})
  }else{
    res.send({code:10,msg:"upload success"})
  }
})

module.exports = app;
