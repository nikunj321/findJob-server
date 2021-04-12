const { sign } = require('jsonwebtoken');


const issueAccessToken = (payload) => {
    return sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: "5m"
        }
    )
}


module.exports = {
    issueAccessToken
}