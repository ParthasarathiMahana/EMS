const UserModal = require('../model/user.model')
import type e = require('express');
const {userSchema } = require('@repo/schemas')
const bcrypt = require('bcrypt')
const {validateAccessToken} = require('../utils/jwt')

const addUser = async(req:e.Request, res:e.Response) => {
    // protect this route later ==> only admin/users themselves can add user info
    // if admin only email and password is ok, others are optional fields
    // empID = unique and auto generated

    try {
        let validData = userSchema.parse(req.body)
        let hashedPassword = await bcrypt.hash(validData.password, 12)
        validData.password = hashedPassword
        const response = await UserModal.create(validData)
        res.status(200).json({"message":response})
    } catch (error) {
        console.error("Error while creating user!", error)
    }
}


const getUser = async(req:e.Request, res:e.Response) => {
    let accessToken = req.cookies.access;
    let verifyRes = await validateAccessToken(accessToken)
    // console.log("verifyRes: ", verifyRes);

    if(verifyRes === null){
        return res.status(401).json({"message":"user not authenticated"})
    }
    
    let {email, role} = verifyRes
    
    try {
        const userDetails = await UserModal.findOne({email: email}, {"password": 0})
        res.status(200).json({"user": userDetails})
    } catch (error) {
        console.error("Error while fetching user details: ", error)
        res.status(500).json({"message": "Internal server error"})  
    }
}

module.exports = {addUser, getUser}