const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const BankAccount = require('../models/bank.model');
require('dotenv').config();

async function seed() {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});
    await BankAccount.deleteMany({});

    // Create and save users with bank accounts
    const user1 = new User({
      username: 'user1',
      email: 'user1@gmail.com',
      password: await bcrypt.hash('1234', 10),
    });

    const user2 = new User({
      username: 'user2',
      email: 'user2@gmail.com',
      password: await bcrypt.hash('1234', 10),
    });

    const account1 = new BankAccount({
      user: user1._id,
      accountNumber: '1234567890',
      balance: 100,
      bankTitle: 'Meezan',
    });

    const account2 = new BankAccount({
      user: user2._id,
      accountNumber: '1234567891',
      balance: 100,
      bankTitle: 'HBL',
    });

    await Promise.all([
      user1.save(),
      user2.save(),
      account1.save(),
      account2.save(),
    ]);

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Error while seeding:', error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
}

seed();
