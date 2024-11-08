const validateCreateProviderContact = (data) => {
    const { providerContactName, providerContactEmail, providerContactNumber, providerId } = data;

    if(typeof providerContactName !== 'string'){
        throw new Error("Provider Contact Name must be a String");
    }
    if(providerContactName.length <= 6){
        throw new Error("Provider Contact Name must be a String of 7 or more characters")
    }
    if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(providerContactName)){
        throw new Error("Provider Contact Name must contain characters from a-z and space")
    }

    if(typeof providerContactEmail !== 'string'){
        throw new Error("Provider Contact Email must be a String");
    }
    if(providerContactEmail.length <= 6){
        throw new Error("Provider Contact Email must be a String of 7 or more characters");
    }
    if(!/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/i.test(providerContactEmail)){
        throw new Error("Provider Contact Email must be the next format: user@domain.com");
    }

    if(typeof providerContactNumber !== 'string'){
        throw new Error("Provider COntact Number must be a String");
    }
    if(providerContactNumber.length <= 11 && providerContactNumber.length >= 13){
        throw new Error("Provider Contact Number must be a String of only 12 characters");
    }
    if(!/^(\+56)(0?9)[987654321]\d{7}$/i.test(providerContactNumber)){
        throw new Error("Provider Contact Number must be the next format: +56911111111");
    }

    if(typeof providerId !== 'string'){
        throw new Error("Provider ID must be a String");
    }
    if(providerId.length !== 24){
        throw new Error("Provider ID must be contain only 24 characters");
    }
    if(!/([^\w\d])+/i.test(providerId)){
        throw new Error("Provider ID must be contain chracater from a-z and numbers from 0-9")
    }
}
const validateSetContact = (data) => {
    const { contactId, providerContactEmail, providerContactNumber, provider } = data;

    if(typeof contactId !== 'string'){
        throw new Error("Provider ID must be a String");
    }
    if(contactId.length !== 24){
        throw new Error("Provider ID must be contain only 24 characters");
    }
    if(!/([^\w\d])+/i.test(contactId)){
        throw new Error("Provider ID must be contain chracater from a-z and numbers from 0-9")
    }

    if(typeof providerContactEmail !== 'string'){
        throw new Error("Provider Contact Email must be a String");
    }
    if(providerContactEmail.length <= 6){
        throw new Error("Provider Contact Email must be a String of 7 or more characters");
    }
    if(!/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/i.test(providerContactEmail)){
        throw new Error("Provider Contact Email must be the next format: user@domain.com");
    }

    if(typeof providerContactNumber !== 'string'){
        throw new Error("Provider COntact Number must be a String");
    }
    if(providerContactNumber.length <= 11 && providerContactNumber.length >= 13){
        throw new Error("Provider Contact Number must be a String of only 12 characters");
    }
    if(!/^(\+56)(0?9)[987654321]\d{7}$/i.test(providerContactNumber)){
        throw new Error("Provider Contact Number must be the next format: +56911111111");
    }

    if(typeof providerId !== 'string'){
        throw new Error("Provider ID must be a String");
    }
    if(providerId.length !== 24){
        throw new Error("Provider ID must be contain only 24 characters");
    }
    if(!/([^\w\d])+/i.test(providerId)){
        throw new Error("Provider ID must be contain chracater from a-z and numbers from 0-9")
    }
}
const validateunAssignContact = (data) => {
    const { contactId } = data;

    if(typeof contactId !== 'string'){
        throw new Error("Provider ID must be a String");
    }
    if(contactId.length !== 24){
        throw new Error("Provider ID must be contain only 24 characters");
    }
    if(!/([^\w\d])+/i.test(contactId)){
        throw new Error("Provider ID must be contain chracater from a-z and numbers from 0-9")
    }
}
module.exports = {
    validateCreateProviderContact,
    validateSetContact,
    validateunAssignContact
}