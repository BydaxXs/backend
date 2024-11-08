//IMPORTAR MODULOS
const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());

const permissonRoutes = require('./routes/permissonRoutes');
const costCenterRoutes = require('./routes/costCenterRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const providerRoutes = require('./routes/providerRoutes');
const requestRoutes = require('./routes/requestRoutes');
const taxDocumentRoutes = require('./routes/taxDocumentRoutes');
const addressRoutes = require('./routes/addressRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const productsRouter = require('./routes/productsRoutes');
const providerContactRoutes = require('./routes/providerContactRoutes');
const countryRoutes = require('./routes/countryRoutes');
const communeRoutes = require('./routes/communeRoutes');
const brandRoutes = require('./routes/brandRoutes');
const itemTypeRoutes = require('./routes/itemTypeRoutes');
const viewRoutes = require('./routes/viewRoutes');
const homeRoutes = require('./routes/homeRoutes');
const viewCategoryRoutes = require('./routes/viewCategoryRoutes');
const subDeptoRoutes = require('./routes/subDeptoRoutes');
const subDeptoFunctionRoutes = require('./routes/subDeptoFunctionRoutes');
const actionRoutes = require('./routes/actionRoutes');
const productBrandRoutes = require('./routes/productBrandRoutes');
const productCategoriesRoutes = require('./routes/productCategoryRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use(`/api/${process.env.API_VER}`, permissonRoutes);
app.use(`/api/${process.env.API_VER}`, costCenterRoutes);
app.use(`/api/${process.env.API_VER}`, userRoutes);
app.use(`/api/${process.env.API_VER}`, authRoutes);
app.use(`/api/${process.env.API_VER}`, providerRoutes);
app.use(`/api/${process.env.API_VER}`, requestRoutes);
app.use(`/api/${process.env.API_VER}`, taxDocumentRoutes);
app.use(`/api/${process.env.API_VER}`, addressRoutes);
app.use(`/api/${process.env.API_VER}`, deliveryRoutes);
app.use(`/api/${process.env.API_VER}`, productsRouter);
app.use(`/api/${process.env.API_VER}`, providerContactRoutes);
app.use(`/api/${process.env.API_VER}`, countryRoutes);
app.use(`/api/${process.env.API_VER}`, communeRoutes);
app.use(`/api/${process.env.API_VER}`, brandRoutes);
app.use(`/api/${process.env.API_VER}`, itemTypeRoutes);
app.use(`/api/${process.env.API_VER}`, viewRoutes);
app.use(`/api/${process.env.API_VER}`, homeRoutes);
app.use(`/api/${process.env.API_VER}`, viewCategoryRoutes);
app.use(`/api/${process.env.API_VER}`, subDeptoRoutes);
app.use(`/api/${process.env.API_VER}`, subDeptoFunctionRoutes);
app.use(`/api/${process.env.API_VER}`, actionRoutes);
app.use(`/api/${process.env.API_VER}`, productBrandRoutes);
app.use(`/api/${process.env.API_VER}`, productCategoriesRoutes);
app.use(`/api/${process.env.API_VER}`, uploadRoutes);

//CONFIGURE UPLOAD FOLDER
app.use(express.static('uploads'));
app.use('/static',express.static(path.join(__dirname,'uploads')));

module.exports = app;