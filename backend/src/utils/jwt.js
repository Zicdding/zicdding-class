require('dotenv').config(); // 환경 변수 로드

const jwt = require('jsonwebtoken');
const getConnection = require('../../config/db');
const secretKey = process.env.SECRET_KEY;
const algorithm = process.env.JWT_ALGO;
const expiresIn = process.env.JWT_EXP;
const issuer = process.env.JWT_ISSUER;
const refreshExpiresIn = process.env.JWT_REFRESH_EXP;

const option = { algorithm, expiresIn, issuer };
const refreshOption = { algorithm, expiresIn: refreshExpiresIn, issuer };
/*
const generateBasicToken = (userId) => {
    const payload = {userId :userId};
    const token = jwt.sign(payload, secretKey, option);
    return token;
}
*/

// 토큰 생성 함수
const generateToken = (userId) => {
  const payload = { userId: userId };
  const token = jwt.sign(payload, secretKey, option);
  return token;
};

const generateRefreshToken = (userId) => {
  const payload = { userId: userId };
  const refreshToken = jwt.sign(payload, secretKey, refreshOption);
  return refreshToken;
};

const saveRefreshToken = (userId, refreshToken) => {
  const checkSql = 'SELECT refresh_token from TB_USER where user_id = ?';
  const updateSql = 'UPDATE TB_USER SET refresh_token = ? where user_id = ?;';
  const insertSql = 'INSERT INTO TB_USER (user_id, refresh_token) VALUES (?, ?)';
  try {
    getConnection((err, connection) => {
      if (err) throw err;
      connection.query(checkSql, [userId], (err, result) => {
        if (err) {
          console.err(err);
          connection.release();
          return;
        }
        console.log(userId);
        if (result[0].length > 0) {
          connection.query(updateSql, [refreshToken, userId], (err) => {
            connection.release();
            if (err) {
              console.log(err, err.message);
            }
          });
        } else {
          connection.query(insertSql, [userId, refreshToken], (err, result) => {
            connection.release();
            if (err) {
              console.err(err.message);
            }
            console.log(result);
          });
        }
        return result;
      });
    });
  } catch (e) {}
};

const replaceAccessToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, secretKey, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      const userId = decoded.userId;
      const newAccessToken = generateToken(userId);
      resolve(newAccessToken);
    });
  });
};

// 토큰 디코딩 함수
const decodedPayload = (token) => {
  const tokenDecoded = jwt.verify(token, secretKey);
  return tokenDecoded;
};

module.exports = { generateRefreshToken, saveRefreshToken, generateToken, replaceAccessToken, decodedPayload };
