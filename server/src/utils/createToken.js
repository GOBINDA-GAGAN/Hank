import config from "../config/env.config.js";
import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {

    const token = jwt.sign(payload, config.accessTokenSecret, { expiresIn: config.accessTokenExpiration });
    return token;
}

export const createRefreshToken = (payload) => {

    const token = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpiration });
    return token;
}

export const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.accessTokenSecret);
        return decoded;
    } catch (error) {
        throw new Error("Invalid access token");
    }
};

export const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.refreshTokenSecret);
        return decoded;
    } catch (error) {
        throw new Error("Invalid refresh token");
    }
};
