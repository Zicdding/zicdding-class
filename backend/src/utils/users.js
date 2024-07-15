const crypto = require('crypto');
const bcrypt = require('bcrypt'); 
const getConnection = require('../../config/db'); 
const { sendResetPasswordEmail } = require('./nodemailer');

//패스워드 랜덤 생성
const resetPassword = (length = 8) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

const resetHashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const resetUserPassword = async (userId, email, res) => {
    const tempPassword = resetPassword();
    const hashedPassword = await resetHashPassword(tempPassword);
    const updateSql = 'UPDATE TB_USER SET password = ?, mod_date =now() WHERE user_id = ?';
    try {
        getConnection((err, connection) => {
            if (err) {
                res.status(500).send('Database err' + err);
            }
            connection.query(updateSql, [hashedPassword, userId], async (err, result) => {
                connection.release();
                if (err) {
                    console.error(err);
                    return res.status(500).send(err);
                }
                    console.log(email)
                    await sendResetPasswordEmail(email, tempPassword)
                    .then(() => res.status(200).send('비밀번호가 변경되었습니다.'))
                    .catch((err) => res.status(500).send('이메일 전송 중 오류가 발생' + err));
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('비밀번호 재설정 중 오류가 발생');
    }
};

module.exports = {resetUserPassword}