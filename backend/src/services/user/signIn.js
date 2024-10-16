import bcrypt from "bcrypt";
import { generateToken, generateRefreshToken, saveRefreshToken, replaceAccessToken, updateRefreshToken } from "../../utils/jwt";
import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";
const output = {
    signIn: async (req, res) => {
        res.render('login_test1');
    }
}
const process = {
    signIn: async (req, res) => {
        const connection = await promisePool.getConnection();
        const { email, password } = req.body;
        console.log(email, password)
        const sql = 'SELECT * FROM TB_USER WHERE email = ?';
        try {
            const [rows] = await connection.query(sql, [email]);
            const rowsPassword = rows[0].password;
            if (rows.length > 0) {
                bcrypt.compare(password, rowsPassword, (err, isMatch) => {
                    if (isMatch === true) {
                        const userId = rows[0].user_id;
                        const accessToken = generateToken({ userId: userId });
                        const refreshToken = generateRefreshToken({ userId: userId });
                        saveRefreshToken(userId, refreshToken);
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
                        setResponseJson(res, 200, '로그인 성공', { accessToken, refreshToken, userId });
                    } else {
                        setResponseJson(res, 400, '아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.입력하신 내용을 다시 확인해주세요.');
                    }
                });
            } else {
                setResponseJson(res, 401, '로그인 실패');
                console.log(err)
            }
        } catch (err) {
            setResponseJson(res, 500, { error: err.message });
            console.log(err)
        }
    }

}

export const signInservice = { output, process }