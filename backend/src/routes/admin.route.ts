import type {Request, Response} from "express"
import mongoose = require("mongoose")
const express = require('express')
const router = express.Router()
const Admin = require('../model/admin.model')
const db = mongoose.connection.db

router.post('/', async(req:Request, res:Response)=>{
    try {
        const response = await Admin.create(req.body)   
        res.status(201).json({"message": "Admin created successfully."})     
    } catch (error) {
        console.log("error while creating Admin: ", error);
        res.status(500).json({message: error})
    }
    // res.json({message:"Hello from post req", body:req.body})
})

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