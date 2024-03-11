var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['token-key'];
    jwt.verify(token, "mySecretKey123", function (err, decoded) {
        if (err) {
            res.status(401).json({ status: "unauthorized" })
        }
        else {
            console.log("decoded data = ", JSON.stringify(decoded));
            let username = decoded['data']['username'];
            req.headers.username = username
            next();
        }
    })
}