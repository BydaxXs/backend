const mongoose = require('mongoose');
const subDeptoSchema = mongoose.Schema({
    subDeptoName:{
        type: String,
        unique: true,
        require: true
    },
    costCenterLink:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'costCenter'
    }
});
module.exports = mongoose.model('subDepto', subDeptoSchema);
