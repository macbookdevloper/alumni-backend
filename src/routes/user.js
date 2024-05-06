const express=require('express');
const routes=express();
const {multerMiddleware}=require('../middleware/multer');
const {uploadController}=require('../controller/CreateAccount');

routes.post('/upload', multerMiddleware.single('file'), uploadController);

module.exports=routes;