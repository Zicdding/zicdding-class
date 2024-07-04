require('dotenv').config(); // 환경 변수 로드

const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
const algorithm = process.env.JWT_ALGO; 
const expiresIn = process.env.JWT_EXP;
const issuer = process.env.JWT_ISSUER;


const option = { algorithm, expiresIn, issuer };


const generateBasicToekn = (id) => {
    const payload = {id :id};
    const token = jwt.sign(payload, secretKey, option);
    return token;
}


// 토큰 생성 함수
const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, option);
    return token;
};

// 토큰 디코딩 함수
const decodedPayload = (token) => {
    const tokenDecoded = jwt.verify(token, secretKey);
    return tokenDecoded;
};



module.exports = { generateBasicToekn ,generateToken, decodedPayload };