require('dotenv').config(); // 환경 변수 로드
import jwt from 'jsonwebtoken';
import promisePool from "../../config/db";

const secretKey = process.env.SECRET_KEY;
const algorithm = process.env.JWT_ALGO;
const expiresIn = process.env.JWT_EXP;
const issuer = process.env.JWT_ISSUER;
const refreshExpiresIn = process.env.JWT_REFRESH_EXP;

const option = { algorithm, expiresIn, issuer };
const refreshOption = { algorithm, expiresIn: refreshExpiresIn, issuer }

console.log(option)
// 토큰 생성 함수
const generateToken = (userId) => {
    const payload = { userId: userId }
    const token = jwt.sign(payload, secretKey, option);
    return token;
};

//

//리프레시 토큰 생성 함수
const generateRefreshToken = (userId) => {
    const payload = { userId };
    const refreshToken = jwt.sign(payload, secretKey, refreshOption);
    return refreshToken;
}
//리프레시 토큰 db에 저장
const saveRefreshToken = async (userId, refreshToken) => {
    const checkSql = 'SELECT refresh_token from TB_USER where user_id = ?';
    const updateSql = 'UPDATE TB_USER SET refresh_token = ? where user_id = ?;';
    const insertSql = 'INSERT INTO TB_USER (user_id, refresh_token) VALUES (?, ?)';
    try {
        const [rows] = await promisePool.query(checkSql, [userId]);
        if (rows.length > 0) {
            await promisePool.query(updateSql, [refreshToken, userId]);
        } else {
            await promisePool.query(insertSql, [userId, refreshToken]);
        }
    } catch (err) {
        console.error('Database operation error: ', err);
        throw err;
    }
}
//새 토큰 발급
const replaceAccessToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, secretKey, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            const userId = decoded.userId;
            const newAccessToken = generateToken(userId);
            resolve(newAccessToken);
        })
    })

}

//리프레시 토큰 만료시 
const updateRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, secretKey, { ignoreExpiration: true }, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            const userId = decoded.userId;
            const newRefreshToken = generateRefreshToken(userId);
            saveRefreshToken(userId, newRefreshToken)
                .then(() => resolve(newRefreshToken))
                .catch(reject);
        });
    });
}

// 토큰 디코딩 함수
const decodedPayload = (token) => {
    const tokenDecoded = jwt.verify(token, secretKey);
    return tokenDecoded;
};



export { generateRefreshToken, saveRefreshToken, generateToken, replaceAccessToken, decodedPayload, updateRefreshToken };