const validateCountry = (data) => {
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
module.exports = {
    validateCountry
} 