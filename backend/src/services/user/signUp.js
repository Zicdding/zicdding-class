import bcrypt from "bcrypt";
import { generateToken, generateRefreshToken, saveRefreshToken, replaceAccessToken, updateRefreshToken } from "../../utils/jwt";
import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";
const output = {
    signUp: async (req, res) => {
        res.render('signUp_test');
    }
}
const process = {
    signUp: async (req, res) => {
        const connection = await promisePool.getConnection();
        const { email, password, nickname, phoneNum } = req.body;
        const passwordBycrpt = bcrypt.hashSync(password, 12);
        const sql = `INSERT 
        INTO TB_USER ( email, password, nickname, phone_num, created_date, mod_date ) 
        VALUES ( ?, ?, ?, ?, now(), now())`;
        const checkSql = 'SELECT email FROM TB_USER WHERE email = ?';
        const data = [email, passwordBycrpt, nickname, phoneNum];
        try {
            await connection.beginTransaction();
            const [checkRows] = await connection.query(checkSql, [email]);
            if (checkRows.length > 0) {
                setResponseJson(res, 409, "이미 사용중인 이메일입니다.");
                return;
            } else {
                const [rows] = await connection.query(sql, data);
                const userId = rows.insertId;
                await connection.commit();

                const accessToken = generateToken({ userId });
                const refreshToken = generateRefreshToken({ userId });
                await saveRefreshToken(userId, refreshToken);

                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: false,
                    expires: new Date(Date.now() + 12 * 60 * 60 * 1000) //12시간
                });

                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: false,
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90일
                });
                await connection.commit();
                setResponseJson(res, 200, '회원가입 완료! 환영합니다', { accessToken, refreshToken, userId });

            }
        } catch (err) {
            await connection.rollback();
            setResponseJson(res, 500, '회원가입 중 오류 발생', { error: err.message })
        } finally {
            connection.release();
        }
    }
}

export const signUpService = { output, process }