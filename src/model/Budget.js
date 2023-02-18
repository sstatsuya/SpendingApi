const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Budget =  new Schema({
    // _id: {type: String},
    timestamp: {type: Number},
    label: {type: String},
    budget: {type: Number},
    used: {type: Number},
})
module.exports = mongoose.model('budgets', Budget)
