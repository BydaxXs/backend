const validateRegister = (data) => {
    const { firstname, secondname, lastname, secondSurname, email, username, password } = data;

    if(typeof firstname !== 'string'){
        throw new Error("Firstname must be a string");
    }
    if(firstname.length <= 3){
        throw new Error("Firstname must be a string of 5 or more chraracters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(firstname)) {
        throw new Error("FirstName must contain characters from a-z and space");
    }

    if(typeof secondname !== 'string'){
        throw new Error("Secondname must be a string");
    }
    if(secondname.length <= 4){
        throw new Error("Secondname must be a string of 5 or more chraracters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(secondname)) {
        throw new Error("Secondname must contain characters from a-z and space");
    }

    if(typeof lastname !== 'string'){
        throw new Error("Lastname must be a string");
    }
    if(lastname.length <= 4){
        throw new Error("Lastname must be a string of 5 or more chraracters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(lastname)) {
        throw new Error("Lastname must contain characters from a-z and space");
    }

    if(typeof secondSurname !== 'string'){
        throw new Error("Secondsurname must be a string");
    }
    if(secondSurname.length <= 4){
        throw new Error("Secondsurname must be a string of 5 or more chraracters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(secondSurname)) {
        throw new Error("Secondsurname must contain characters from a-z and space");
    }

    if(typeof email !== 'string'){
        throw new Error("Email must be a string");
    }
    if(email.length <= 4){
        throw new Error("Email must be a string of 5 or more chraracters");
    }
    let largo = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
    if (!largo.test(email.toLowerCase())) {
        throw new Error("Email must contain characters from a-z and space");
    }
    if(typeof username !== 'string'){
        throw new Error("Username must be a string");
    }
    if(username.length <= 4){
        throw new Error("Username must be a string of 5 or more chraracters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(username)) {
        throw new Error("Username must contain characters from a-z and space");
    }

    if(typeof password !== 'string'){
        throw new Error("Username must be a string");
    }
    let pass = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040-\u002e])(?=.*[A-Z])(?=.*[a-z])\S{8,20}$/
    if (!pass.test(password)){
        throw new Error("Your password must be longer than 8 characters, have at least 1 capital letter, have at least 1 number, and have at least 1 special character");
    }
}
const validateLogin = (data) => {
    const { username, password } = data;
    if(typeof username !== 'string'){
        throw new Error("Username must be a string");
    }
    if(username.length <= 4){
        throw new Error("Username must be a string of 5 or more characters");
    }
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(username)) {
        throw new Error("Username must contain characters from a-z and space");
    }

    if(typeof password !== 'string'){
        throw new Error("Username must be a string");
    }
    let pass = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040-\u002e])(?=.*[A-Z])(?=.*[a-z])\S{8,20}$/
    if (!pass.test(password)){
        throw new Error("Your password must be longer than 8 characters, have at least 1 capital letter, have at least 1 number, and have at least 1 special character");
    }
    return "OK";
}
const validateCostCenter = (data) => {
    const { costCenterCode, costCenterName, costCenterNom } = data;
    if(typeof costCenterCode !== 'string'){
        throw new Error("Cost Center Code must be a String");
    }
    if(costCenterCode.length <= 4 && costCenterCode.length >= 6){
        throw new Error("Cost Center Code must be a String of 5 characters")
    }
    if(typeof costCenterName !== 'string'){
        throw new Error("Cost Center Name must be a String");
    }
    if(costCenterName.length <= 4){
        throw new Error("Cost Center Name must be a String of 5 or more characters");
    }
    if(typeof costCenterNom !== 'string'){
        throw new Error("Cost Center Nomenclature must be a String");
    }
    if(costCenterNom.length < 2 && costCenterNom.length > 4){
        throw new Error("Cost Center Nomenclature must be a String of 3 characters");
    }

    return "OK";
}
const validateCreatePermissons = (data) => {
    const { code, namePermisson } = data;
    if(typeof code !== 'string'){
        throw new Error("Permisson Code must be a String");
    }
    if(code.length < 6 && code.length > 7 ){
        throw new Error("Permisson Code must be a String of 6 characters");
    }
    if(typeof namePermisson !== 'string'){
        throw new Error("Permisson Name must be a String");
    }
    if(namePermisson.length <= 4){
        throw new Error("Permisson name must be a String of 4 o more characters");
    }
    return "OK";
}
const validateCreateProvider = (data) => {
    const { providerRUT, providerName, providerContact } = data;
    if(typeof providerRUT !== 'string'){
        throw new Error("Provider RUT must be a String");
    }
    if(providerRUT.length <= 3){
        throw new Error("Provider RUT must be a Strinf of 4 or more characters");
    }
    if(typeof providerName !== 'string'){
        throw new Error("Provider Name must be a String");
    }
    if(providerName.length <= 2){
        throw new Error("Provider Name must be a Strinf of 2 or more characters");
    }
    if(typeof providerContact.nameContact !== 'string'){
        throw new Error("Contact Name must be a String");
    }
    if(providerContact.nameContact.length <= 3){
        throw new Error("Contact Name must be a Strinf of 4 or more characters");
    }
    if(typeof providerContact.emailContact !== 'string'){
        throw new Error("Contact Email must be a String");
    }
    if(providerContact.emailContact.length <= 3){
        throw new Error("Contact Email must be a Strinf of 4 or more characters");
    }
    return "OK"
}
const validateCreateRequest = (data) => {
    const { requestId, requestMethod, applicant, createDate, state, costCenter } = data;
    if(typeof requestId !== 'string'){
        throw new Error("Request Id must be a String");
    }
    if(requestId.length <= 3){
        throw new Error("Request Id must be a String of 4 o more characters")
    }
    if(typeof requestMethod.requestVia !== 'string'){
        throw new Error("Request Via must be a String");
    }
    if(requestMethod.requestVia.length <= 3){
        throw new Error("Request Via must be a String of 4 or more characters");
    }
    if(typeof requestMethod.requestTrackinId !== 'string'){
        throw new Error("Request TrackinId must be a String");
    }
    if(requestMethod.requestTrackinId.length <= 3){
        throw new Error("Request TrackingId must be a String of 4 or more characters");
    }
    if(typeof applicant.applicantName !== 'string'){
        throw new Error("Applicant Name must be a String");
    }
    if(applicant.applicantName.length <= 7){
        throw new Error("Applicant Name must be a String of 8 or more characters");
    }
    if(typeof applicant.applicantRUT !== 'string'){
        throw new Error("Applicant RUT must be a String");
    }
    if(applicant.applicantRUT.length < 11 && applicant.applicantRUT.length > 12){
        throw new Error("Applicant RUT must be a String of 12 characters");
    }
    if(typeof applicant.applicantEmail !== 'string'){
        throw new Error("Applicant Email must be a String");
    }
    if(applicant.applicantEmail.length < 13){
        throw new Error("Applicant Email nust be a String of 13 or more characters");
    }
    if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(applicant.applicantEmail)) {
        throw new Error("Applicant Email must contain characters from a-z and space");
    }
    if(typeof applicant.applicantPhone !== 'string'){
        throw new Error("Applicant Phone must be a String");
    }
    if(applicant.applicantPhone.length <= 8 && applicant.applicantPhone.length >= 10){
        throw new Error("Applicant Phone must be a String of 9 characters");
    }
    if(!/^[0-9]+$/i.test(applicant.applicantPhone)){
        throw new Error("Applicant Phone must contain characters from 0-9");
    }
    if(typeof applicant.applicantPosition !== 'string'){
        throw new Error("Applicant Position must be a String");
    }
    if(applicant.applicantPosition.length < 1){
        throw new Error("You need write something");
    }
    if(typeof createDate !== 'string'){
        throw new Error("Create Date must be a String");
    }
    if(createDate.length < 1){
        throw new Error("You need write something");
    }
    if(!/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i.test(createDate)){
        throw new Error("The format of create date must be dd/mm/yyyy");
    }
    if(typeof state !== 'string'){
        throw new Error("State must be a String");
    }
    if(state.length < 1){
        throw new Error("You need write something");
    }
    if(!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i.test(state)) {
        throw new Error("State must contain characters from a-z and space");
    }
    if(typeof costCenter !== 'string'){
        throw new Error("Cost Center must be a String");
    }
    if(costCenter.length < 5 && costCenter.length > 6){
        throw new Error("Cost Center must be a String of 6 characters");
    }
    return "OK";
}
const validateCreateTaxDoc = (data) => {
    const { docNumber, emissionDate, docType, supplier, recivedItems, applicant } = data;
    if(typeof docNumber !== 'string'){
        throw new Error("Document Number must be a String");
    }
    if(docNumber.length < 1){
        throw new Error("You need write something");
    }
    if(typeof emissionDate !== 'string'){
        throw new Error("Emission Date must be a String");
    }
    if(!/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i.test(emissionDate)){
        throw new Error("The format of emission date must be dd/mm/yyyy");
    }
    if(typeof docType !== 'string'){
        throw new Error("Document Type must be a String");
    }
    if(docType.length < 1){
        throw new Error("You need write something");
    }
    if(typeof supplier !== 'string'){
        throw new Error("Supplier must be a String");
    }
    if(supplier.length < 1){
        throw new Error("You need write something");
    }
    if(typeof applicant !== 'string'){
        throw new Error("Applicant must be a String");
    }
    if(applicant.length < 1){
        throw new Error("You need write something");
    }
    return "OK"; 
}
const validateAddress = (data) => {
    const { store, storeAddress } = data;
    if(typeof store !== 'string'){
        throw new Error("Store must be a String");
    }
    if(store.length < 1){
        throw new Error("You need write something");
    }
    if(typeof storeAddress !== 'string'){
        throw new Error("Store Address must be a String");
    }
    if(storeAddress.length < 1){
        throw new Error("You need write something");
    }
    return "OK"
}
const validateDelivery = (data) => {
    const { orderNumber, senderName, senderStore, reciverName, reciverStore, sendDate } = data;
    if(typeof orderNumber !== 'string'){
        throw new Error("Order Number must be a string");
    }
    if(orderNumber.length < 1 && orderNumber.length > 14){
        throw new Error("Order Number must be a string of 13 characters");
    }
    if(typeof senderName !== 'string'){
        throw new Error("Sender Name must be a string");
    }
    if(senderName.length < 1){
        throw new Error("You need write something");
    }
    if(typeof senderStore !== 'string'){
        throw new Error("Sender Store must be a string");
    }
    if(senderStore.length < 1){
        throw new Error("You need write something");
    }
    if(typeof reciverName !== 'string'){
        throw new Error("Reciver Name must be a string");
    }
    if(reciverName.length < 1){
        throw new Error("You need write something");
    }
    if(typeof reciverStore !== 'string'){
        throw new Error("Reciver Store must be a string");
    }
    if(reciverStore.length < 1){
        throw new Error("You need write something");
    }
    if(typeof sendDate !== "string"){
        throw new Error("Send Date must be a string");
    }
    if(sendDate.length < 1){
        throw new Error("You need write something");
    }
    if(!/^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i.test(sendDate)){
        throw new Error("The format of create date must be dd/mm/yyyy");
    }
    return "OK";
}
const validateUserName = (username) => {
    let regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑÜü]{4,20}$/
    return regex.test(username);
}
module.exports = {
    validateRegister,
    validateLogin,
    validateCostCenter,
    validateCreatePermissons,
    validateCreateProvider,
    validateCreateRequest,
    validateCreateTaxDoc,
    validateAddress,
    validateDelivery,
    validateUserName


    //SEPARAR LOS VALIDADORES EN ARCHIVOS ESPECIFICOS
    //SOLO PARA LEER MAS FACIL LOS VALIDADORES
}