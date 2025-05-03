const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
  try {
    const { adminToken } = req.cookies;

    if (!adminToken) {
      return res.status(401).json({ error: 'JWT not found' });
    }

    const verifiedToken = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (!verifiedToken || verifiedToken.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only' });
    }

    req.admin = verifiedToken;

    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ error: 'Admin authorization failed' });
  }
};

module.exports = authAdmin;