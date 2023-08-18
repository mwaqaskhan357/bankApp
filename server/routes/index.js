const express = require('express');
const userRouter = require('./user.routes');
const bankRouter = require('./bank.routes');

const appRoutes = express();

appRoutes.use('/user', userRouter);
appRoutes.use('/bank', bankRouter);

module.exports = appRoutes;
