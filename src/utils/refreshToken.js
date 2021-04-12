const { sign } = require('jsonwebtoken');

const issueRefreshToken = (payload) => {
    return sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: "7d"
        }
    )
}

module.exports = {
    issueRefreshToken
}