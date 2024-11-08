const mongoose = require("mongoose");
const addressSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        require: true
    },
    store: {
        type: String,
        unique: true,
        require: true
    },
    storeAddress: {
        type: String,
        unique: true,
        require: true
    }
});
module.exports = mongoose.model("address", addressSchema);