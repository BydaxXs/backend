const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    brandName : {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('brand', brandSchema);
