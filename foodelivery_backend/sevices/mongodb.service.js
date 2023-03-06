const { MongoClient } = require("mongodb");
const {mongoConfig} = require("../config")

class MongoDB{
    static connectToMongoDB=()=>{
        MongoClient.connect(mongoConfig.connectionUrl).then(
            (connection)=>{
                console.log("MondoDB Connected")
                this.db=connection.db(mongoConfig.database)
            }
        ).catch(cerror=>console.log("MondoDB Not Connected"));
    }
}

MongoDB.db=null;

module.exports=MongoDB;