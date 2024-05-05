const express = require("express");
require("dotenv").config();
const databaseConnection=require('./config/DBConnection');

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server start on ${PORT}`);
})

databaseConnection();