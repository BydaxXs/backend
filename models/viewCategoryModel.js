const mongoose = require('mongoose');

const viewsCategorySchema = mongoose.Schema({
    viewCategoryName : {
        type: String,
        unique: true,
        require: true
    }
});

module.exports = mongoose.model("viewsCategory", viewsCategorySchema);