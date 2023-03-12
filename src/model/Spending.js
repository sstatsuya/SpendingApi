const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Spending =  new Schema({
    name: {type: String},
    value: {type: Number},
    timestamp: {type: Number},
})
module.exports = mongoose.model('spendings', Spending)
