const config=require("./package.json").projectConfig

module.exports={
    mongoConfig:{
        connectionUrl:config.mongoConnectionUrl,
        database:"foodelivery_db",
        collections:{
            USERS:"users",
            RESTAURANTS:"restaurants",
            JOBS:"jobs",
            ANNOUNCEMENTS:"announcements",
            ALUMNI:"alumni",
            STUDENTPROFILE:"studentProfile",
            JOBAPPLICATIONS:"jobApplications"
        },
    },
    serverConfig:{
        ip:config.serverIp,
        port:config.serverPort,
    },
    tockenSecret:"foodelivery_secret",
}