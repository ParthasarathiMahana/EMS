import process = require("process")
const mongoose = require('mongoose')

const connectToDb = async() => {2
    try {
        // console.log("Connecting to MongoDB...", process.env.DB_CONNECTION_STRING)
        const connectionString = process.env.DB_CONNECTION_STRING
        if (!connectionString) {
            throw new Error("DB_CONNECTION_STRING environment variable is not set")
        }
        let response = await mongoose.connect(connectionString)
        console.log("Successfully connected to MongoDB")
        return response
    } catch (error) {
        console.log("Error while connecting with mongoDB", error);
        throw error
    }
}

module.exports = connectToDb