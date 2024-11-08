const validateCreateItemType = (data) => {
    const { itemCategoryName } = data;

    if (typeof itemCategoryName !== 'string') {
        throw new Error("Item Category must be a String");
    }
    if (itemCategoryName.length <= 3) {
        throw new Error("Item Category must be a String of 4 or more characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(itemCategoryName)) {
        throw new Error("Item Category must contain characters from a-z and space");
    }
    return "OK";
}
module.exports = {
    validateCreateItemType
}