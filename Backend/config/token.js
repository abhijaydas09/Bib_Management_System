const jwt = require('jsonwebtoken');

const genToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not set in environment');
  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { genToken, verifyToken };
