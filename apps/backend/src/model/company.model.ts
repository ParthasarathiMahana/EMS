const mongoose = require('mongoose')

const CompanyModel = new mongoose.Schema({
    companyName: {type: String, required: true},
    companyId: {type: String, required: true}
})

module.exports = mongoose.model("Companies",CompanyModel)