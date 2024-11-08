const jwt = require('jsonwebtoken');
const log4 = require('log4js');
const logger = log4.getLogger("");
logger.level = "all";

const JwT_KEY = process.env.KEY_PRI;

function createAccessToken(user){
    const expiredToken = new Date();

    const payload = {
        token_type : "access",
        user_id: user._id,
        iat: Date.now(),
        expired: expiredToken.getTime()
    }

    return jwt.sign(payload, JwT_KEY);
}

function createRefreshToken(user){
    const expiredToken = new Date();
    expiredToken.getMonth(expiredToken.getMonth() + 1);

    const payload = {
        token_type: "refresh",
        user_id:user._id,
        iat: Date.now(),
        expired: expiredToken.getTime()
    }

    return jwt.sign(payload, JwT_KEY);
}

function createEncriptedUserViews(user){
    const payload = {
        user_id: user._id,
        userViews: user.userMenu,
    }
    return jwt.sign(payload, JwT_KEY);
}

function decoded(token){
    return jwt.decode(token, JwT_KEY, true);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded,
    createEncriptedUserViews
}