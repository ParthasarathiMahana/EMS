import mongoose = require('mongoose')
const UserModal = require('../model/user.model')
import type e = require('express');



const addUser = async(req:e.Request, res:e.Response) => {
    try {
        const response = await UserModal.create(req.body)
        res.status(200).json({"message":"User created."})
    } catch (error) {
        console.error("Error while creating user!", error)
    }
}

module.exports = {addUser}