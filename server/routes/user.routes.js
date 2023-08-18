const express = require('express');
const { login } = require('../controllers/user.controller');

const userRouter = express();

userRouter.post('/login', login);

module.exports = userRouter;
