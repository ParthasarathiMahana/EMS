const UserModal = require('../model/user.model')
import type e = require('express');
const {userSchema } = require('@repo/schemas')
const bcrypt = require('bcrypt')

const addUser = async(req:e.Request, res:e.Response) => {
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

module.exports = {addUser}