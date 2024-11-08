const mongoose = require('mongoose');

const permissonSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique:true
    },
    namePermisson: {
        type: String,
        require: true,
        unique: true
    },
    postName : {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model("Permison", permissonSchema);