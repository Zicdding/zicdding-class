import bcrypt from "bcrypt";
import { generateToken, generateRefreshToken, saveRefreshToken, replaceAccessToken, updateRefreshToken } from "../../utils/jwt";
import { resetUserPassword } from "../../utils/users";
import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";

const output = {
    signUp: (req, res) => {
        res.render('signUp_test');
    },

    signIn: (req, res) => {
        res.render('login_test1');
    },

    changePassword: (req, res) => {
        res.render('pwd_change');
    },
    report: (req, res) => {
        res.render('user_report_test')
    },
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

    me: async (req, res) => {
        const userId = req.user.userId;
        const sql = 'SELECT nickname, email, phone_num FROM TB_USER where user_id = ?';
        try {
            const [rows] = await promisePool.query(sql, [userId]);
            const result = rows[0];
            console.log(rows)
            if (rows.length > 0) {
                setResponseJson(res, 200, "마이페이지 조회 성공", result);
            } else {
                setResponseJson(res, 500, "마이페이지 조회 실패");
            }
        } catch (err) {
            console.log(err);
            setResponseJson(res, 500, "마이페이지 조회 실패", { error: err.message });
        }
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
    },

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
    },

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

    changePassword: async (req, res) => {
        const connection = await promisePool.getConnection();
        const { password, newPassword } = req.body;
        const userId = req.user.userId;
        console.log(password)
        const hashedPaaword = bcrypt.hashSync(newPassword, 12);
        const sql = 'UPDATE TB_USER SET password = ?, mod_date = now() where user_id =?';
        const checkSql = 'SELECT password from TB_USER where user_id = ?';
        try {
            await connection.beginTransaction();
            const [checkRows] = await connection.query(checkSql, [userId]);
            console.log(checkRows)
            const checkRowsPassword = checkRows[0].password;

            if (checkRows.length > 0) {
                const isMatch = await bcrypt.compare(password, checkRowsPassword);
                if (!isMatch) {
                    setResponseJson(res, 401, '없는 비밀번호입니다.')
                }
                const [updateResult] = await connection.query(sql, [hashedPaaword, userId]);
                if (updateResult.affectedRows > 0) {
                    setResponseJson(res, 200, '비밀번호 변경에 성공하였습니다.');
                }
            }
        } catch (err) {
            await connection.rollback();
            console.log(err);
            setResponseJson(res, 500, '비밀번호 변경 중 오류가 발생했습니다.', { error: err.message })
        }
    },

    me: async (req, res) => {
        const connection = await promisePool.getConnection();
        const { nickname, phoneNum } = req.body;
        const newPassword = req.body.newPassword;
        const userId = req.user.userId;
        const sql = `
        UPDATE TB_USER 
        SET 
            nickname = IFNULL(NULLIF(?, ""), nickname), 
            password = IFNULL(NULLIF(?, ""), password), 
            phone_num = IFNULL(NULLIF(?, ""), phone_num) 
        WHERE user_id = ?;`;
        try {
            await connection.beginTransaction();
            if (newPassword) {
                const hashedPaaword = bcrypt.hashSync(newPassword, 12);
                const values = [
                    nickname || "",
                    hashedPaaword || "",
                    phoneNum || "",
                    userId
                ];
                const rows = await connection.query(sql, values);
                if (rows.affectedRows > 0) {
                    setResponseJson(res, 200, '마이페이지 정보 변경에 성공하였습니다.', rows);
                }
            } else {
                const values = [
                    nickname || "",
                    newPassword || "",
                    phoneNum || "",
                    userId
                ];
                const [rows] = await connection.query(sql, values);
                if (rows.affectedRows > 0) {
                    setResponseJson(res, 200, '마이페이지 정보 변경에 성공하였습니다.');
                }
            }
        } catch (err) {
            await connection.rollback();
            console.log(err);
            setResponseJson(res, 500, '마이페이지 정보 변경 중 오류가 발생했습니다.', { error: err.message })
        }
    },
    report: async (req, res) => {
        const userId = req.user.userId;
        const { targetUserId } = req.params;
        let { reasonType, reasonContent } = req.body;
        const targetCheckSql = 'SELECT user_id FROM TB_USER WHERE user_id = ?';
        const reportTypeSql = 'SELECT code, description from TB_CODE WHERE code_group_id = 5 and sort = ?';
        const sql = 'INSERT INTO TB_USER_REPORT(user_id, target_user_id, reason_type, reason_content) VALUES(?, ?, ?, ?)';
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            console.log(targetUserId)
            const [targetResult] = await connection.query(targetCheckSql, [targetUserId]);
            if (targetResult.length === 0) { //신고 대상 유저 확인 여부
                setResponseJson(res, 500, '해당 유저가 존재하지 않습니다');
            }
            const [reportTypeResult] = await connection.query(reportTypeSql, [reasonType]);
            if (!reportTypeResult) {
                setResponseJson(res, 500, '신고사유 오류');
            }
            reasonType = reportTypeResult[0].code;
            const data = [userId, targetUserId, reasonType, reasonContent];
            const [result] = await connection.query(sql, data)
            if (result.affectedRows > 0) {
                await connection.commit();
                setResponseJson(res, 200, '신고가 완료되었습니다.');
            }
        } catch (err) {
            await connection.rollback();
            console.log(err)
            setResponseJson(res, 500, '신고 중 오류가 발생하였씁니다.', { error: err.message })
        } finally {
            connection.release();
        }
    }
}


export const userService = { output, process };