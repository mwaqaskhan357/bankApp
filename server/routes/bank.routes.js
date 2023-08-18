const express = require('express');
const {
  getAllTransactions,
  sendMoney,
} = require('../controllers/bank.controller');
const { authenticateToken } = require('../middlewares');

const bankRouter = express();
bankRouter.use(authenticateToken);

bankRouter.post('/send', sendMoney);
bankRouter.get('/transactions', getAllTransactions);

module.exports = bankRouter;
