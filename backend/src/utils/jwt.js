require('dotenv').config;

const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
const alorithm = process.env.JWT_ALGO;
const expiresIn = process.env.JWT_EXP;
const issuer = process.env.JWT_ISSUER;


const option = {alorithm, expiresIn, issuer};

//토큰 생성
const generateToken = (payload => {
    return jwt.sign(payload, secretKey, option);
})

//디코딩
const decodedPayload = (token => {
    return jwt.sign(token,secretKey);
})

module.exports = {generateToken, decodedPayload}