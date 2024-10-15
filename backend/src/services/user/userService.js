import bcrypt from "bcrypt";
import { generateToken, generateRefreshToken, saveRefreshToken, replaceAccessToken, updateRefreshToken } from "../../utils/jwt";
import { resetUserPassword } from "../../utils/users";
import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";
import uploadFileToMinIO from '../../utils/minio';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
const output = {
    logout: (req, res) => {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        setResponseJson(res, 200, '로그아웃 성공');
        console.log('로그아웃 성공')
    },

    checkEmail: async (req, res) => {
        const userEmail = req.query.email;
        const sql = 'SELECT count(email) AS result FROM TB_USER WHERE email = ?;';
        console.log(userEmail)
        try {
            const [rows] = await promisePool.query(sql, [userEmail]);
            const result = rows[0].result;
            console.log(result)
            if (result > 0) {
                setResponseJson(res, 409, "이미 사용중인 이메일입니다.");
            } else {
                setResponseJson(res, 200, "사용 가능한 이메일입니다.");
            }
        } catch (err) {
            console.log(err);
            setResponseJson(res, 500, { error: err.message });
        }
    },


}

const process = {

    replaceToken: (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return setResponseJson(res, 403, '토큰 만료');
        updateRefreshToken(refreshToken)
            .then((newRefreshToken) => {
                replaceAccessToken(newRefreshToken)
                    .then((newAccessToken) => {
                        setTokensInCookies(res, newAccessToken, newRefreshToken);
                        setResponseJson(res, 200, '토큰 재발급', { accessToken: newAccessToken, refreshToken: newRefreshToken });
                    })
                    .catch((err) => {
                        setResponseJson(res, 403, { error: err.message });
                    });
            })
            .catch((err) => {
                setResponseJson(res, 403, { error: err.message });
            });
    },

    resetPassword: async (req, res) => {
        const email = req.body.email;
        if (!email) {
            setResponseJson(res, 400, '이메일을 입력하세요.');
        }
        const sql = 'SELECT * FROM TB_USER WHERE email = ?';
        const [rows] = await promisePool.query(sql, [email]);
        try {
            if (rows.length > 0) {
                const userId = rows[0].user_id;
                resetUserPassword(userId, email, res);
            } else {
                setResponseJson(res, 400, '존재하지 않는 ID입니다.');
            }
        } catch (err) {
            setResponseJson(res, 500, err.message)
        }

    },

}


export const userService = { output, process };