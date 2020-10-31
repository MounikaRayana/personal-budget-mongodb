const mongoose = require('mongoose')

const budgetSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim: true,
        unique: true
    },
    budget:{
        type:Number,
        required:true,
        trim: true
    },
    color:{
        type:String,
        required:true,
        trim: true,
        uppercase:true,
        minlength: 6,
        match: [/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Color not valid']
    }
},{collection: 'budgetData'});

module.exports = mongoose.model('budgetData',budgetSchema);