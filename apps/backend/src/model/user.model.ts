const mongoose = require("mongoose");

const mongoUserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    empID: {type: String, unique: true, required: true},
    phone: String,
    email: {type: String, unique: true, required: true},
    password: {type: String, minlength: 6, required: true},
    designation: String,
    company: {type: String, required: true},
    reportingManager: [String],
    reportee: [String],
    team: String,
    leaves: {
        totalLeaves: { type: mongoose.Schema.Types.Mixed },
        leavesTaken: { type: mongoose.Schema.Types.Mixed },
        leavesRemaining: { type: mongoose.Schema.Types.Mixed },
    },
    profilePicture: String,
    role: String,
    location: String,
    teamsize: Number,
    projectsCount: Number,
    performanceScore: Number,
    bio: String,
    skills: [String],
    department: String,
    joiningDate: String,
    employmentType: String,
    status: String,
})

module.exports = mongoose.model("Users", mongoUserSchema)