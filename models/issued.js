const mongoose = require('mongoose');

const issued = new mongoose.Schema({
    book_id:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    user_id:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    issue_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    return_date: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true
    }
})