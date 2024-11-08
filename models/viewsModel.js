const mongoose = require('mongoose');

const viewsSchema = mongoose.Schema({
    viewName: {
        type: String,
        unique: true,
        require: true
    },
    apiPath: {
        type: String,
        unique: true,
        require: true
    },
    frontPath:{
        type: String,
        unique: true,
        require: true
    },
    viewPermisson:{
        type: String,
        require: true,
    },
    actionLink : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'action'
    }
});

module.exports = mongoose.model("view", viewsSchema);