const validateCreateBrand = (data) => {
    const { brandName } = data;

    if (typeof brandName !== 'string') {
        throw new Error("Brand Name must be a String");
    }
    if (brandName.length <= 1) {
        throw new Error("Brand Name must be a string of 2 or more characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(brandName)) {
        throw new Error("Commune Name must contain characters from a-z and space");
    }
}
module.exports = {
    validateCreateBrand
}