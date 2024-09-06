/*This file is called by server.js when connectDB() is invoked.
It handles the connection to the MongoDB database.
connectMongoDB/db.js establishes a connection to the MongoDB database.
*/
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://seema:seema38436065@cluster0.ow7iytj.mongodb.net/ReactProject";

async function connectDB() {
    
      try {
        await mongoose.connect(mongoDB);
        

        console.log('MongoDB is connected');
      } catch (error) {
        //console.error(`Unable to connect to the server: ${error}`);
        throw new Error(`Unable to connect to the server: ${error}`);

      }
    }
 module.exports = connectDB;




 
