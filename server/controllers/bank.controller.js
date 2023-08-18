const BankAccount = require('../models/bank.model');
const Transaction = require('../models/transaction.model');

const sendMoney = async (req, res) => {
  const { account, amount } = req.body;
  const userId = req.userId;

  try {
    const fromAccount = await BankAccount.findOne({ user: userId });
    const toAccount = await BankAccount.findOne({ accountNumber: account });

    if (!fromAccount || !toAccount) {
      return res.status(404).json({ error: 'Bank account not found.' });
    }

    if (fromAccount.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance.' });
    }

    // Deduct the amount from the sender's account
    fromAccount.balance = Number(fromAccount.balance) - Number(amount);
    await fromAccount.save();

    // Add the amount to the receiver's account
    toAccount.balance = Number(toAccount.balance) + Number(amount);
    await toAccount.save();

    // Record the transaction history
    const transaction = new Transaction({
      fromAccount: fromAccount._id,
      toAccount: toAccount._id,
      amount,
    });
    await transaction.save();

    res.json({ message: 'Money sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const bank = await BankAccount.findOne({ user: req.userId });
    // Find transactions where the logged-in user is either the sender or receiver
    const transactions = await Transaction.find({
      $or: [{ fromAccount: bank._id }, { toAccount: bank._id }],
    }).populate('fromAccount toAccount', 'accountNumber'); // Populate sender and receiver details

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMoney, getAllTransactions };
