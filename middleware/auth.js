const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization").split(" ");
  console.log(authHeader);
  const token = authHeader[1];
  if (!token) return res.status(401).json({ message: "Auth Error" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: "Invalid Token", error: e });
  }
};
