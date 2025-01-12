const jwt = require('jsonwebtoken');
const User = require('../schemas/UserSchema');
const { SECRET_KEY } = require('./jwt');

const authenticate = async (req, res, next) => {
  console.log('Cookies:', req.cookies); // Отпечатайте всички бисквитки
  const token = req.cookies.token; 
  console.log('imame li token?', token); // Проверете стойността на токена
  console.log(document.cookie)
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Проверете токена
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = await User.findById(decoded.id); // Добавяне на потребителя към заявката

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // Продължете към следващия middleware/handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token', error });
  }
};


module.exports = authenticate;
