import mongoose = require('mongoose')
const AdminModel = require('../model/admin.model')
import type e = require('express');

const db = mongoose.connection.db;

const addAdmin = async(req:e.Request, res:e.Response) => {
    try {
        const response = await AdminModel.create(req.body)
        res.status(200).json({"message":"Admin created."})
    } catch (error) {
        console.error("Error while creating admin", error)
    }
}

exports = addAdmin