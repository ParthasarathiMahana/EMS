import type {Request, Response} from "express"
import mongoose = require("mongoose")
const express = require('express')
const router = express.Router()
const Admin = require('../model/user.model')
const db = mongoose.connection.db
const {addUser} = require("../controller/user.controller")

router.post('/', addUser)

router.delete('/', async(req:Request, res:Response)=>{
    console.log(req.body);
    try {
        await Admin.deleteOne({"password": req.body.password})
        res.status(204).json({message:"admin deleted"})
    } catch (error) {
        res.status(500).json({message:"error while deleting admin"})
    }
})

module.exports = router