const mongoose = require('mongoose');

const itemTypeSchema = mongoose.Schema({
    itemCategoryName: {
        type: String,
        require: true,
        unique: true
    }
});

module.exports = mongoose.model("itemsType", itemTypeSchema);