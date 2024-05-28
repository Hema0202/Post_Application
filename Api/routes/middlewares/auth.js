const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res.send({
        status: false,
        message: "You are not logged in!",
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err)
        return res.send({
          status: false,
          message: "Invalid token!",
        });

        req.user = decodedToken;
      next();
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
}

module.exports = auth;
