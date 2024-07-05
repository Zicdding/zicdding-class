require('dotenv').config(); // 환경 변수 로드

const jwt = require('jsonwebtoken');
const getConnection = require('../../config/db');
const secretKey = process.env.SECRET_KEY;
const algorithm = process.env.JWT_ALGO; 
const expiresIn = process.env.JWT_EXP;
const issuer = process.env.JWT_ISSUER;
const refreshExpiresIn  = process.env.JWT_REFRESH_EXP;

const option = { algorithm, expiresIn, issuer };
const refreshOption = {algorithm, expiresIn : refreshExpiresIn, issuer}

const generateBasicToken = (userId) => {
    const payload = {userId :userId};
    const token = jwt.sign(payload, secretKey, option);
    return token;
}

const generateRefreshToken = (userId) =>{
    const payload = {userId : userId};
    const refreshToken = jwt.sign(payload, secretKey, refreshOption);
    return refreshToken;
}

const saveRefreshToken = (userId, refreshToken) =>{
    const sql = 'UPDATE TB_USER SET refresh_token = ? where user_id = ?;'
    getConnection((err,connection) => {
        if(err) throw err;
        connection.query(sql,[refreshToken,userId], (err,result) =>{
            connection.release();
            console.log(userId)
            if(err) throw err;
            return result;
        });
    })
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



module.exports = { generateBasicToken , generateRefreshToken, saveRefreshToken, generateToken, decodedPayload };