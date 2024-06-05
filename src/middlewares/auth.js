const jwt = require("jsonwebtoken");
const userModel = require("./../model/userModel");

function authentication(req, res, next) {
    try {
        //Get the authorization header
        let authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).send({
                status: false,
                message: "Authorization header missing",
            });
        }

        //Check if the token is in Bearer format
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                status: false,
                message: "Bearer token missing",
            });
        }

        // Verify the token
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err)
                return res.status(403).send({
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

async function authorization(req, res, next) {
    try {
        let userData = req.userData;
        if (userData.type != "admin")
            return res.status(403).send({
                status: false,
                message: "You are not authorized...",
            });
        next();
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message,
        });
    }
}

module.exports = {
    authentication,
    authorization,
};
