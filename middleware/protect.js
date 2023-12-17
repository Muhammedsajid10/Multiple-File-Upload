const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    console.log('Token in authRequire:', token);

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Data in authRequire:', decode);

    req.user = decode;
    console.log('User in authenticateToken:', req.user);
    next();
  } catch (err) {
    res.status(403).send('Invalid token');
  }
};

module.exports = authenticateToken;