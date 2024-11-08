const validateCreateProduct = (data) => {
    const { brand, model, description, provider } = data;

    if (typeof brand !== 'string') {
        throw new Error("Brand must be a String");
    }
    if (brand.length !== 24) {
        throw new Error("Brand must be a string of only 24 characters");
    }
    if(!/([^\w\d])+/i.test(brand)){
        throw new Error("Provider ID must be contain chracater from a-z and numbers from 0-9")
    }

    if (typeof model !== 'string') {
        throw new Error("Model must be a String");
    }
    if (model.length <= 5) {
        throw new Error("Model must be a string of 6 or more characters");
    }
    if (!/([^\w\d])+/i.test(model)) {
        throw new Error("Model must be contain chracater from a-z and numbers from 0-9");
    }

    if (typeof description !== 'string') {
        throw new Error("Description must be a String");
    }
    if (description.length <= 8) {
        throw new Error("Description must be a String of 9 or more characters");
    }
    if (!/[^\s\w.,]/i.test(model)) {
        throw new Error("Provider ID must be contain chracater from a-z numbers from 0-9, point and comma");
    }

    if (typeof provider !== 'string') {
        throw new Error("Provider ID must be a String");
    }
    if (provider.length !== 24) {
        throw new Error("Provider ID must be contain only 24 characters");
    }
    if(!/([^\w\d])+/i.test(provider)){
        throw new Error("Provider ID must be contain chracater from a-z and numbers from 0-9")
    }
}
const validateAddProvider = (data) => {
    const { idProduct, providers } = data;

    if (typeof idProduct !== 'string') {
        throw new Error("Product ID must be a String");
    }
    if (idProduct.length !== 24) {
        throw new Error("Product ID must be contain only 24 characters");
    }
    if(!/([^\w\d])+/i.test(idProduct)){
        throw new Error("Product ID must be contain chracater from a-z and numbers from 0-9")
    }

    if (typeof providers !== 'string') {
        throw new Error("Provider Id must be a String");
    }
    if (providers.length !== 24) {
        throw new Error("Provider ID must be contain only 24 characters");
    }
    if(!/([^\w\d])+/i.test(providers)){
        throw new Error("Provider ID must be contain chracater from a-z and numbers from 0-9")
    }

}
module.exports = {
    validateCreateProduct,
    validateAddProvider
}