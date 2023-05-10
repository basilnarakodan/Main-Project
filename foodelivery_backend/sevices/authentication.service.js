const MondoDB = require("./mongodb.service")
const { mongoConfig, tockenSecret } = require("../config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const config = require("../config");

const userRegister = async (user) => {
    try {
        if (!user?.username || !user?.email || !user?.password)
            return { status: false, message: "Please fill up all the fields" };
        const passwordHash = await bcrypt.hash(user?.password, 10)
        let userObject = {
            username: user?.username,
            email: user?.email,
            password: passwordHash,
            first_name: "",
            last_name: "",
            phone: "",
            gender: "",
            dob: "",
            country: "",
            city: "",
            institution_name: "",
            register_number: "",
            course: "",
            stream: "",
            active_backlog: "",
            hsc_percentage: "",
            hsc_cgpa: "",
            hsc_passing_year: "",
            ssc_percentage: "",
            ssc_cgpa: "",
            ssc_passing_year: "",
            degree_percentage: "",
            degree_cgpa: "",
            degree_passing_year: ""
        };

        let savedUser = await MondoDB.db
            .collection(mongoConfig.collections.USERS)
            .insertOne(userObject);

        if (savedUser?.acknowledged && savedUser?.insertedId) {
            let tocken = jwt.sign(
                { username: userObject?.username, email: userObject?.email },
                tockenSecret,
                { expiresIn: '24h' })

            return {
                status: true,
                message: "User registered successfully",
                data: tocken,
            };
        } else {
            return {
                status: false,
                message: "User register failed",
            };
        }

    } catch (error) {
        console.log(error);
        let errorMessage = "User register failed";
        error?.code === 11000 && error?.keyPattern?.username ? (errorMessage = "Username already exist") : null;
        error?.code === 11000 && error?.keyPattern?.email ? (errorMessage = "Email already exist") : null;
        return {
            status: false,
            message: errorMessage,
            error: error?.toString(),
        };
    }
};


const userLogin = async (user) => {
    try {
        if (!user?.username || !user?.password)
            return {
                status: false,
                message: "Please fill up all the fields"
            };
        let userObject = await MondoDB.db
            .collection(mongoConfig.collections.USERS)
            .findOne({ username: user?.username });
        if (userObject) {
            let isPasswordVerified = await bcrypt.compare(user?.password, userObject?.password)
            if (isPasswordVerified) {
                let tocken = jwt.sign(
                    { username: userObject?.username, email: userObject?.email },
                    tockenSecret,
                    { expiresIn: '90d' })
                return {
                    status: true,
                    message: "User login successfull",
                    data: tocken,
                };
            } else {
                return {
                    status: false,
                    message: "Incorrect password",
                };
            }
        } else {
            return {
                status: false,
                message: "No user found",
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "User login failed",
            error: error?.toString(),
        };
    }
};


const checkUserExist = async (query) => {
    let messages = {
        email: "User already exist.",
        username: "This username is taken."
    }
    try {
        queryType = Object.keys(query)[0]
        let userObject = await MondoDB.db
            .collection(mongoConfig.collections.USERS)
            .findOne(query);
        console.log(userObject)
        return !userObject ? { status: true, message: `This ${queryType} is not taken` } : { status: false, message: messages[queryType] }
    } catch (error) {

    }
};

const tokenVerification = async (req, res, next) => {
    console.log(
        `authentication.service | tokenVerification | ${req?.originalUrl}`
    );
    try {
        if (
            // req?.originalUrl.includes("/login") ||
            // req?.originalUrl.includes("/user-exist") ||
            // req?.originalUrl.includes("/register") ||
            // req?.originalUrl.includes("/refresh-token")

            req?.originalUrl.endsWith("/login") ||
            req?.originalUrl.endsWith("/user-exist") ||
            req?.originalUrl.endsWith("/register") ||
            req?.originalUrl.endsWith("/get")||
            req?.originalUrl.endsWith("/adminlogin")||
            req?.originalUrl.endsWith("/newjob")||
            req?.originalUrl.endsWith("/newannouncement")

        )
            return next();
        let token = req?.headers["authorization"];


        if (token && token.startsWith("Bearer ")) {

            token = token.slice(7, token?.length);
            jwt.verify(token, config.tockenSecret, (error, decoded) => {
                if (error) {

                    res.status(401).json({
                        status: false,
                        message: error?.name ? error?.name : "Invalid Token",
                        error: `Invalid token | ${error?.message}`,
                    });
                } else {

                    req["username"] = decoded?.username;
                    next();
                }
            });
        } else {
            res.status(401).json({
                status: false,
                message: "Token is missing",
                error: "Token is missing",
            });
        }
    } catch (error) {
        res.status(401).json({
            status: false,
            message: error?.message ? error?.message : "Authentication failed",
            error: `Authentication failed | ${error?.message}`,
        });
    }
};

// const tokenRefresh = async (req, res) => {
//     console.log(`authentication.service | tokenRefresh | ${req?.originalUrl}`);
//     try {
//       let token = req?.headers["authorization"];
//       if (token && token.startsWith("Bearer ")) {
//         token = token.slice(7, token?.length);
//         jwt.verify(
//           token,
//           config.tockenSecret,
//           { ignoreExpiration: true },
//           async (error, decoded) => {
//             if (error) {
//               res.status(401).json({
//                 status: false,
//                 message: error?.name ? error?.name : "Invalid Token",
//                 error: `Invalid token | ${error?.message}`,
//               });
//             } else {
//                 console.log(decoded)
//               if (decoded?.username && decoded?.email) {
//                 let newToken = jwt.sign(
//                   { username: decoded?.username, email: decoded?.email },
//                   tockenSecret,
//                   { expiresIn: "24h" }
//                 );
//                 res.json({
//                   status: true,
//                   message: "Token refresh successful",
//                   data: newToken,
//                 });
//               } else {
//                 res.status(401).json({
//                   status: false,
//                   message: error?.name ? error?.name : "Invalid Token",
//                   error: `Invalid token | ${error?.message}`,
//                 });
//               }
//             }
//           }
//         );
//       } else {
//         res.status(401).json({
//           status: false,
//           message: error?.name ? error?.name : "Token missing",
//           error: `Token missing | ${error?.message}`,
//         });
//       }
//     } catch (error) {
//       res.status(401).json({
//         status: false,
//         message: error?.name ? error?.name : "Token refresh failed",
//         error: `Token refresh failed | ${error?.message}`,
//       });
//     }
//   };

module.exports = { userRegister, userLogin, checkUserExist, tokenVerification }