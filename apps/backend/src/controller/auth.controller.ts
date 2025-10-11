import type e = require('express');
const UserModal = require('../model/user.model')
const {loginSchema} = require('@repo/schemas')
const {createAccessToken} = require('../utils/jwt')
const bcrypt = require('bcrypt')

const login = async(req: e.Request, res: e.Response) => {
    // console.log(req.body)
    try {
        let validUserCredential = loginSchema.parse(req.body)
        const userData = await UserModal.findOne({"email": validUserCredential.email})
        // console.log(userData)

        let isPasswordMatch = await bcrypt.compare(validUserCredential.password, userData.password)

        if(isPasswordMatch){
            let token = createAccessToken({email: userData.email, role:userData.role})
            res.cookie("access", token, {httpOnly: true})
        }else{
            res.status(401).json({"message":"wrong password"})
        }
        res.status(200).json({"message": "Logged in successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({"error loggin in user": error})
    }
}

const logout = async (req: e.Request, res: e.Response) => {
    // console.log(req.cookies.access)
    res.clearCookie("access")
    res.json({"message":"logged out successfully"})
}

module.exports = {login, logout}