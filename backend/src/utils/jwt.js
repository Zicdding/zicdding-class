require('dotenv').config(); // 환경 변수 로드

const jwt = require('jsonwebtoken');
/*
const secretKey = process.env.SECRET_KEY;
const algorithm = process.env.JWT_ALGO;  // 오타 수정
const expiresIn = process.env.JWT_EXP;
const issuer = process.env.JWT_ISSUER;
*/

const secretKey  = 'ZIC';
const algorithm ='HS256';
const expiresIn = '10h';
const issuer = 'USER';

const option = { algorithm, expiresIn, issuer }; // 오타 수정

// 토큰 생성 함수
const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, option);
};

// 토큰 디코딩 함수
const decodedPayload = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = { generateToken, decodedPayload };