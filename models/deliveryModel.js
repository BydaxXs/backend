const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true,
        require: true
    },
    senderName: {
        type: String,
        require: true
    },
    senderAddress: {
        store: String,
        storeAddress: String
    },
    reciverName: {
        type: String,
        require: true
    },
    reciverAddress: {
        store: String,
        storeAddress: String
    },
    sendItems: [{
        implement: String,
        price: Number,
        documentNumber: String
    }],
    sendDate: {
        type: String
    },
    state: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("delivery", deliverySchema);