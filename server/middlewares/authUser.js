const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  try {
    const { userToken } = req.cookies;

    if (!userToken) {
      return res.status(401).json({ error: "Please login or signup" });
    }

    const verifiedToken = jwt.verify(userToken, process.env.JWT_SECRET);

    if (verifiedToken.role !== "user") {
      return res.status(403).json({ error: "Access denied: User only route" });
    }

    req.user = verifiedToken.id;
    next();

  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ error: "User authorization failed" });
  }
};

module.exports = { authUser };