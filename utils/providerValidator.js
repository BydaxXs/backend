const validateCreateProvider = (data) => {
    const { providerRUT, providerRegisteredName, providerFantasyName, market, address, countryCommune } = data;

    if(typeof providerRUT !== 'string'){
        throw new Error("");
    }
    if(providerRUT.length <= 10 && providerRUT.length >= 13){
        throw new Error("Provider RUT must be a string of 11 or 12 characters");
    }
    if(!/^[1-9]{1,2}.\d{3}.\d{3}-[1-9,Kk]$/i.test(providerRUT)){
        throw new Error("Provider RUT must be the format 11.111.111-1 or 11.111.111-K");
    }

    if(typeof providerRegisteredName !== 'string'){
        throw new Error("Provider Registered Name must be a String");
    }
    if(providerRegisteredName.length >= 30){
        throw new Error("Provider Registered Name must not exceed 30 characters");
    }
    if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(providerRegisteredName)){
        throw new Error("Provider Registered Name must contain characters from a-z and space");
    }

    if(typeof providerFantasyName !== 'string'){
        throw new Error("Provider Fantasy Name must be a String");
    }
    if(providerFantasyName.length <= 2){
        throw new Error("Provider Fantasy Name must be a string of 3 or more characters");
    }

    if(typeof market !== 'string'){
        throw new Error("Market must be a String");
    }
    if(market.length >= 30){
        throw new Error("Market must not exceed 30 characters");
    }
    if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(market)){
        throw new Error("Market must contain characters from a-z and space");
    }

    if(typeof address !== 'string'){
        throw new Error("Address must be a String");
    }
    if(address.length >= 30){
        throw new Error("Address must not exceed 30 characters");
    }

    if(typeof countryCommune !== 'string'){
        throw new Error("Country Commune must be a String");
    }
    if(countryCommune.length !== 24){
        throw new Error("Country Commune must be contain only 24 characters");
    }
    if(/[^\w\d]+$/i.test(countryCommune)){
        throw new Error("Country Commune must be contain chracater from a-z and numbers from 0-9");
    }
    return "OK";
}
module.exports = {
    validateCreateProvider
}