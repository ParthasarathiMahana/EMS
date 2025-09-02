require("dotenv").config();
const express = require("express");
import type e = require("express");
const connectToDb = require("./DB/monngodb");

const app = express()
app.use(express.json()) // can accept json in req.body
app.use(express.urlencoded({ extended: true })) //can accept form with key value pairs, value(can be array, object. reason: extend==>true)

app.get('/', (req: e.Request, res: e.Response)=>{
    res.json({"message": "Hello There... Welcome to Hyperloop"})
})

app.use('/admin', require('./routes/admin.route'))

const startServer = async() => {
    try {
        await connectToDb()
        app.listen(3001, (err: any)=>{
            if(err){
                return console.error("Error while seting up the port for your server: ",err);
            }
        
            console.log("Server is up and running on port: ", 3001);
        })
    } catch (error) {
        console.error("Error while connecting to DB or listening to port", error)
    }
}

startServer()