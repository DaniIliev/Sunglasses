const jwt = require("jsonwebtoken");

const SECRET_KEY = 'bigSecretOOD';

exports.generateToken = (userData) => {
    return jwt.sign(
        {
            _id: userData._id,
            email: userData.email,
            firstName: userData.firstName,
        },
        SECRET_KEY,
        { expiresIn: "7d" }
    );
};
module.exports = { SECRET_KEY };