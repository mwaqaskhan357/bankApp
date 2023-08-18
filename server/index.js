const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const appRoutes = require('./routes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;

dbConnection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);
dbConnection.once('open', () => {
  console.log('Connected to MongoDB');

  app.use('/api/v1', appRoutes);

  // Start the server
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
