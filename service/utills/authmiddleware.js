const jwt = require('jsonwebtoken');
const User = require('../schemas/UserSchema');
const { SECRET_KEY } = require('./jwt');



exports.auth = async (req,res,next) => {
  const token = req.cookies['auth']
  if(token){
      try{
          const decodedToken = jwt.verify(token, secret())

          req.user = decodedToken
          req.isAuthenticated = true

          res.locals.user = decodedToken
          res.locals.isAuthenticated = true

      }catch(err){
          res.clearCookie('auth')
      }
  }
  next()
}
// exports.authenticate = async (req, res, next) => {
//   console.log(req)
//   console.log('Cookies:', req.cookies['auth']); // Отпечатайте всички бисквитки
//   const token = req.cookies.token; 
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     // Проверете токена
//     const decoded = jwt.verify(token, SECRET_KEY);
//     req.user = await User.findById(decoded.id); // Добавяне на потребителя към заявката

//     if (!req.user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     next(); // Продължете към следващия middleware/handler
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token', error });
//   }
// };

exports.isAuthenticated = (req,res,next) => {
  if(!req.user) {
      res.redirect('/404')
  }
  next()
}