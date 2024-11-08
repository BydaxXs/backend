const mongoose = require('mongoose');
const subDeptoProcessSchema = mongoose.Schema({
    subDeptoFunctionName:{
        type: String,
        require: true
    },
    subDeptoLink:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:'subDepto'
    }
});
module.exports = mongoose.model('subDeptoProcess', subDeptoProcessSchema);