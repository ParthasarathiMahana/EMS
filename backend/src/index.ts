const express = require("express")
require("dotenv").config()

const app = express()


app.listen(3001, (err: any)=>{
    if(err){
        return console.error("Error while seting up the port for your server: ",err);
    }

    console.log("Server is up and running on port: ", 3001);
})