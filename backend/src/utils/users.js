const crypto = require('crypto');
const bcrypt = require('bcrypt'); 
import promisePool from "../../config/db";
import setResponseJson from "../utils/responseDto";
const { sendResetPasswordEmail } = require('./nodemailer');

//패스워드 랜덤 생성
const resetPassword = async (length = 8) => {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
};

const resetHashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

const resetUserPassword = async (userId, email, res) => {
    const tempPassword = await resetPassword();
    const hashedPassword = await resetHashPassword(tempPassword);
    const updateSql = 'UPDATE TB_USER SET password = ?, mod_date =now() WHERE user_id = ?';
    try {
        console.log(userId)
        const [result] = await promisePool.query(updateSql, [hashedPassword, userId]);
        console.log(result.affectedRows)
        if (result.affectedRows > 0) {
            try {
                await sendResetPasswordEmail(email, tempPassword);
                setResponseJson(res, 200, '비밀번호가 변경되었습니다.');
            } catch (err) {
                console.error('Email sending error: ', err);
                setResponseJson(res, 500, '이메일 전송 중 오류가 발생', { error: err.message });
            }
        } else {
            setResponseJson(res, 405, '아이디를 다시 입력해 주세요.');
        }
    } catch (err) {
        console.error(err);
        setResponseJson( res, 500, '이메일 전송 중 오류가 발생', { error: err.message });

    }
};

const suspensionCheck = async (req,res,userId) => {
    const sql = 'SELECT suspension_yn FROM TB_USER where user_id = ?';
    try{
        const [rows] = await promisePool.query(sql,userId);
        if(rows.length > 0){
            return rows[0].suspension_yn === 'Y';
        }else{
             setResponseJson(res, 500, '처리 중 오류 발생');
        }
    }catch(err){
        console.error(err);
         setResponseJson( res, 500, {error :  err.message});
         return false
    }

}
module.exports = {suspensionCheck,resetUserPassword}; 