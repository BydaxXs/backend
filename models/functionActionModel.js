const mongoose = require('mongoose');

const processActionSchema = mongoose.Schema({
    actionName:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('processAction', processActionSchema);