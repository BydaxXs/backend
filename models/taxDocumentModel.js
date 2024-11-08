const mongoose = require('mongoose');

const taxDocumentSchema = mongoose.Schema({
    docNumber:{
        type: String,
        unique: true,
        require: true
    },
    emissionDate: String,
    docType:{
        type: String,
        require: true
    },
    supplier:{
        
    },
    recivedItems:[{
        implement: String,
    }],
    applicant:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model("taxDocument", taxDocumentSchema);