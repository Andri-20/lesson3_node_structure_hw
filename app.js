const express = require('express');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');
require('dotenv').config();

const {userRouter, carRouter, authRouter} = require("./router");

const configs = require('./config/config');
const {cronRunner} = require("./cron");
const swagger = require('./swagger.json');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('/auth', authRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swagger)) // for documentation

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        message: err.message || "Unknown error",
        status: err.status || 500
    })
})

app.listen(configs.PORT, async () => {
    await mongoose.connect(`${configs.MONGO_URL}`);
    console.log(`server listen port ${configs.PORT}`);
    cronRunner();
})
