const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    model : {
        type: String,
        require: true
    },
    description : {
        type: String,
        require: true
    },
    productBrandLink : {
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'productBrand'
    },
    productCategoryLink : {
        type: mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'productCategory'
    }
});

module.exports = mongoose.model("product", productsSchema);