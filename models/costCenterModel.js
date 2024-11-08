const mongoose = require('mongoose')

const costCenterSchema = mongoose.Schema({
    costCenterCode : {
        type : String,
        required : true,
        unique : true
    },
    costCenterName : {
        type : String,
        required : true,
        unique : true
    },
    costCenterNom : {
        type : String,
        require : true,
        unique : true
    }
});

module.exports = mongoose.model("costCenter", costCenterSchema);