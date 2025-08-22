const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    loginId: String,
    password: String
})

module.exports = mongoose.model("Admin", adminSchema)