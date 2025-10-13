import type e = require('express');
const UserModel = require('../model/user.model')
const {loginSchema} = require('@repo/schemas')
const {createAccessToken, createRefreshToken, validateAccessToken} = require('../utils/jwt')
const bcrypt = require('bcrypt')

const login = async(req: e.Request, res: e.Response) => {
    try {
        let validUserCredential = loginSchema.parse(req.body)
        const userData = await UserModel.findOne({ "email": validUserCredential.email })   
    
        if (!userData) {
          // 🚨 if userData is null, bcrypt.compare will crash
          return res.status(404).json({ message: "User not found" })
        }
    
        let isPasswordMatch = await bcrypt.compare(validUserCredential.password, userData.password)
        
        if (!isPasswordMatch) {
          return res.status(401).json({ message: "Wrong credentials" })
        }
    
        let token = createAccessToken({ email: userData.email, role: userData.role })
        let refresh = createRefreshToken({email: userData.email, role: userData.role})
    
        // 🧠 return here is good practice to stop execution
        return res
          .cookie("access", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
          })
          .cookie("refresh", refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
          })
          .status(200)
          .json({ message: "Login successful" })
    
      } catch (error) {
        console.error(error)
        // ⚠️ 500 usually means internal server error, not "user doesn't exist"
        return res.status(500).json({ message: "Internal server error", error })
      }
}

const me = async(req: e.Request, res: e.Response) => {
    let accessToken = req.cookies.access;
    let refreshToken = req.cookies.refresh

    let verifyRes = await validateAccessToken(accessToken)
    if(verifyRes !== null){
        let userDetails = await UserModel.findOne({email: verifyRes.email}, {"password": 0})
        // console.log(userDetails);
        return res.status(200).json({"isAuth": true, "user": userDetails}).end()
    }else{
        return res.status(401).json({"isAuth":false, "message":"user not authenticated"})
    }

    // return console.log(verifyRes);
}

const logout = async (req: e.Request, res: e.Response) => {
    // console.log(req.cookies.access)
    res.clearCookie("access", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
    res.clearCookie("refresh", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
    return res.status(200).json({"message":"logged out successfully"})
}

module.exports = {login, logout, me}