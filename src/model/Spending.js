const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Spending =  new Schema({
    // _id: {type: String},
    name: {type: String},
    value: {type: Number},
    date: {type: Number},
})
module.exports = mongoose.model('spending', Spending)
