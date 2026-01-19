const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { db } = require("../db");
const UUID = require("uuidv7");

const capitalizeFirstLetter = (str) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

async function register(req, res) {
  const { FirstName, LastName, Email, Password, ConfirmPassword } = req.body;
  if (Password !== ConfirmPassword) {
    return res.status(422).send({ error: "Passwords do not match." });
  }
  if (!FirstName || !LastName || !Email || !Password) {
    return res.status(400).send({ error: "Missing some parameters." });
  }

  if (await db.users.findOne({ where: { Email: req.body.Email } })) {
    return res.sendStatus(409).send({ error: "Email already in use." });
  }

  try {
    hashedPassowrd = await bcrypt.hash(Password, 10);
    await db.users.create({
      UserID: UUID.uuidv7(),
      FirstName: capitalizeFirstLetter(FirstName.trim()),
      LastName: capitalizeFirstLetter(LastName.trim()),
      Email,
      Password: hashedPassowrd,
    });
    return res.sendStatus(201);
  } catch (error) {
    console.error("Register error:", error);
    return res.status(400).json({ message: "Could not register.", error: error.message });
  }
}

async function login(req, res) {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).send({ error: "Missing some parameters." });
  }
  const user = await db.users.findOne({ where: { Email: req.body.Email } });

  if (!user) {
    return res.status(404).send({ error: "User not found." });
  }

  const passwordMatch = await bcrypt.compare(Password, user.Password);
  if (!passwordMatch) {
    return res.status(401).send({ error: "Invalid password." });
  }
  const accessToken = jwt.sign(
    {
      UserID: user.UserID,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1800s" }
  );
  const refreshToken = jwt.sign(
    {
      UserID: user.UserID,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  user.RefreshToken = refreshToken;
  user.LastLogin = new Date();
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: true
  });
  res.json({ access_token: accessToken });
}

async function logout(req, res) {
  try {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(204);

    const refreshToken = cookies.refreshToken;
    const user = await db.users.findOne({ where: { RefreshToken: refreshToken } });

    if (!user) {
      res.clearCookie("refreshToken", 
        { httpOnly: true, 
          sameSite: "None", 
          secure: true });
      return res.sendStatus(204);
    }

    user.RefreshToken = null;
    await user.save();

    res.clearCookie("refreshToken", 
      { httpOnly: true, 
        sameSite: "None", 
        secure: true });
    res.sendStatus(204);
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Logout failed" });
  }
}

async function refresh(req, res) {
  const cookies = req.cookies;
  if (!cookies.refreshToken) return res.sendStatus(401);
  const refreshToken = cookies.refreshToken;
  const user = await db.users.findOne({ where: { RefreshToken: refreshToken } });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.UserID !== decoded.UserID) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserID: decoded.UserID,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1800s" }
    );
    res.json({ access_token: accessToken });
  });
}

async function user(req, res) {
  const user = req.user;
  return res.status(200).json(user);
}

module.exports = {
  register,
  login,
  logout,
  refresh,
  user,
};
