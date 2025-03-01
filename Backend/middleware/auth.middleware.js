const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
  
    if (!token) return res.status(401).json({ message: "Access Denied" });
  
    try {
      const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      console.log("Error JWT:", error.message);
      res.status(400).json({ message: "Invalid Token" });
    }
  };
  

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You do not have permission" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
