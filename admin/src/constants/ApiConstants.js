const BACKEND_BASE_URL="http://127.0.0.1:3000";

const STATIC_IMAGE = {
    BASE_URL: `${BACKEND_BASE_URL}/images`,
    TYPE: {POSTER: 'poster', LOGO: 'logo', GALLERY: 'gallery'},
    SIZE: {SQUARE: 'square', LANDSCAPE: 'landscape', PORTRAIT: 'portrait'},
    QUALITY: {SD: 'sd', HD: 'hd'},
  };

const BACKEND_API={
    BASE_API_URL:`${BACKEND_BASE_URL}/api`,
    REGISTER:'/register',
    LOGIN:'/login',
    USER:'/user',
    USER_EXIST:"/user-exist",
    REFRESH_TOKEN:'/refresh-token',
    RESTAURANT:'/restaurant',
    JOB:'/job',
    ANNOUNCEMENT:'/announcement',
    ALUMNI:'/alumni',
    STUDENTPROFILE:'/studentProfile',
    ADMIN:'/admin'
};



export default {BACKEND_API,STATIC_IMAGE}