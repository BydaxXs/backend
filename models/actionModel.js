const mongoose = require('mongoose');

const actionSchema = mongoose.Schema({
    actionName : {
        type : String,
        require : true
    },
    processLink : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'subDeptoProcess'
    }
});
module.exports = mongoose.model('action', actionSchema);