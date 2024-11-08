const mongoose = require('mongoose');
const commune = require('./communeModel');

const providerSchema = mongoose.Schema({
    providerRUT: {
        type: String,
        unique: true,
        require: true
    },
    providerRegisteredName:{
        type: String,
        unique: true,
        require: true
    },
    providerFantasyName:{
        type: String,
        unique: true,
        require: true
    },
    market:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    countryCommune:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'commune'
    },
    providerProductInfo : []
});

module.exports = mongoose.model("provider", providerSchema);