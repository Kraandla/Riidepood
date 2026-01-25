const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { db } = require("../db");

function autenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        req.user = {};
        return next();
      }

      const user = await db.users.findOne({ where: { UserID: decoded.UserID } });

      if (user && user.RefreshToken) {
        req.user = {
          UserID: user.UserID,
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          IsAdmin: user.IsAdmin,
        };
      } else {
        req.user = {};
      }

      return next();
    });
  } else {
    req.user = {};
    return next();
  }
}

module.exports = autenticateToken;
