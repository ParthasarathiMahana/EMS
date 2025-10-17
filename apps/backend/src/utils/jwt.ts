const jwt = require('jsonwebtoken')
let jwtAccessSecret = process.env.JWT_SECRET_KEY_Access
let jwtRefreshSecret = process.env.JWT_SECRET_KEY_Refresh

type userDetailType = {
    email: String,
    role: String
}

const createAccessToken = (userDetails: userDetailType) => {
    return jwt.sign({email: userDetails.email, role: userDetails.role}, jwtAccessSecret, { expiresIn: '15m' })
}

const createRefreshToken = (userDetails: userDetailType) => {
    return jwt.sign({email: userDetails.email, role: userDetails.role}, jwtRefreshSecret, { expiresIn: '48h' })
}

const validateAccessToken = async(accessToken: string) => {
    try {
        let validationResult = await jwt.verify(accessToken, jwtAccessSecret)
        return validationResult
    } catch (error) {
        console.log("error: ", error)
        return null
    }
}
const validateRefreshToken = async(refreshToken: string) => {
    try {
        let validateResult = await jwt.verify(refreshToken, jwtRefreshSecret)
        return validateResult
    } catch (error) {
        console.log("error: ", error)
        return null
    }
}

module.exports = {createAccessToken, createRefreshToken, validateAccessToken, validateRefreshToken}