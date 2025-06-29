const mongoose = require('mongoose');

const db = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('DB Connected');
  } catch (error) {
    console.log('DB Connection Error:', error.message);
  }
};

module.exports = db;
