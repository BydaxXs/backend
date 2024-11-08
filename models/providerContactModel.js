const mongoose = require('mongoose');
const provider = require('./providerModel');

const providerContactSchema = mongoose.Schema({
    providerContactName: {
        type: String,
        unique: true,
        require: true
    },
    providerContactEmail: {
        type: String,
        unique: true,
        require: true
    },
    providerContactNumber: {
        type: String,
        unique: true,
        require: true
    },
    provider:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'provider'
    }
});

module.exports = mongoose.model("providerContact", providerContactSchema);