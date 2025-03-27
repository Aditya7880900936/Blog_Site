const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function createTokenForUser(user){
    const payload = {
        name: user.fullName,
        _id: user._id,
        email: user.email,
        role: user.role,
        profileImageURL: user.profileImageURL,
    }
    const token = JWT.sign(payload, secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token, secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
}