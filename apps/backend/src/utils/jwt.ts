const jwt = require('jsonwebtoken')
let jwtAccessSecret = process.env.JWT_SECRET_KEY_Access
let jwtRefreshSecret = process.env.JWT_SECRET_KEY_Refresh

type userDetailType = {
    email: String,
    role: String
}

const createAccessToken = (userDetails: userDetailType) => {
    return jwt.sign({email: userDetails.email, role: userDetails.role}, jwtAccessSecret, { expiresIn: '1h' })
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
    }
}
const validateRefreshToken = () => {}

const removeAccessToken = () => {}

const removeRefreshToken = () => {}

module.exports = {createAccessToken, createRefreshToken, validateAccessToken, validateRefreshToken, removeAccessToken, removeRefreshToken}