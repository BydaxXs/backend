const mongoose = require('mongoose');

const communeSchema = mongoose.Schema({
    communeName:{
        type:String,
        unique: true,
        require: true
    },
    postalCode:{
        type: String,
        unique: true,
        require: true
    },
    country:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'country'
    }
});

module.exports = mongoose.model("commune", communeSchema);