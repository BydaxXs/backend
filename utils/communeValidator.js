const validateCommuneRegister = (data) => {
    const { communeName, postalCode, country } = data;

    if(typeof communeName !== 'string'){
        throw new Error("Commune Name must be a String");
    }
    if(communeName.length <= 3){
        throw new Error("Commune Name must be a string of 4 or more characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(communeName)) {
        throw new Error("Commune Name must contain characters from a-z and space");
    }

    if(typeof postalCode !== 'string'){
        throw new Error("Postal code must be a String");
    }
    if(postalCode.length !== 7){
        throw new Error("Postal Code must be a string of only 7 characters");
    }
    if(!/^[0-9]+$/i.test(postalCode)){
        throw new Error("Postal Code must be conatin characters from 0-9");
    }

    if(typeof country !== 'string'){
        throw new Error("Country must be a String");
    }
    if(country.length !== 24){
        throw new Error("Country must be a string of only 24 characters");
    }
    if(/[^\w\d]+$/i.test(postalCode)){
        throw new Error("Postal code must contain characters from a-z and numbers from 0-9");
    }
    return "OK";
}
const validateAllCommuneConuntry = (data) => {
    const { countryName } = data;

    if(typeof countryName !== 'string'){
        throw new Error("Country Name must be a String");
    }
    if(countryName.length <= 3){
        throw new Error("Country Name must be a string of 4 or more characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(countryName)) {
        throw new Error("Country Name must contain characters from a-z and space");
    }
    return "OK";
}
const validateCommuneDelete = (data) => {
    const { idCommune } = data;

    if(typeof idCommune !== 'string'){
        throw new Error("Commune ID must be a String");
    }
    if(idCommune.length !== 24){
        throw new Error("Commune ID must be a string of only 24 characters");
    }
    if(/[^\w\d]+$/i.test(idCommune)){
        throw new Error("Commune ID must contain characters from a-z and numbers from 0-9");
    }
    return "OK";
}
module.exports = {
    validateCommuneRegister,
    validateAllCommuneConuntry,
    validateCommuneDelete
}