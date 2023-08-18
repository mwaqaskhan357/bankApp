const jwt = require('jsonwebtoken');

// Authorization middleware
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodedToken.userId; // Store the userId in the request for further use
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
}

module.exports = {
  authenticateToken,
};
