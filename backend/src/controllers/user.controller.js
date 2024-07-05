import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken, saveRefreshToken } from "../utils/jwt";
const getConnection = require('../../config/db');
const setResponseJson = require('../models/responseDto');


const output = {
    signup : (req,res) =>{
        res.send('회원가입');
    },

    'check-email' : (req, res) => {
        const user_email = req.body.email;
        const sql = 'SELECT count(email) AS result FROM TB_USER WHERE email = ?;';

        try{
            getConnection((err, connection) => {
                if(err){
                    setResponseJson(res, 500,  { message: err.message });
                    console.log(err)
                }
                connection.query(sql, user_email, (err,rows,result) => {
                    if(err){
                        setResponseJson(res, 500, { message: err.message });
                        console.log(err)
                    }else{
                        connection.release();
                        const queryResult = rows[0].result;
                        if (queryResult >= 1) {
                            res.send(setResponseJson(res, 409, '이미 사용중인 이메일입니다.'));
                        } else {
                            res.send(setResponseJson(res, 200, '사용 가능한 이메일입니다.'));
                        }
                    }
                });
            });
        }catch(err){
            console.log(err);
        }
    } 
}

const process = {
    signup : (req, res) => {
        
        const {email, password, nickname, phoneNum} = req.body;
        const passwordBycrpt = bcrypt.hashSync(password, 12);

        const sql = `INSERT 
        INTO TB_USER ( email, password, nickname, phone_num, created_date, mod_date ) 
        VALUES ( ?, ?, ?, ?, now(), now())`;
        try{
            const data = [email, passwordBycrpt, nickname, phoneNum];
            
            getConnection((err,connection) => {
                    if(err){
                        setResponseJson(res, 500, {message : err.message});
                        console.log(err)
                    }
                    connection.query(sql, data, (err, result) =>{
                        connection.release();
                            if(err){
                                setResponseJson(res, 500, {message : err.message});
                                console.log(err)
                            }
                            setResponseJson(res, 200, '회원가입 완료! 환영합니다');
                            console.log(result)
                        });
                })
        }catch(err){
            console.log(err);
        }
    },

    signIn : (req, res )=> {
        const {email, password} = req.body;
        const sql = 'SELECT * FROM TB_USER WHERE email = ?';
        try{
            if(email && password) {
                getConnection((err,connection)=>{
                    if(err){
                        setResponseJson(res, 500, {message : err.message});
                        console.log(err);
                    }
                    connection.query(sql, [email,password], (err, results)=>{
                        connection.release();
                        if(err){
                            setResponseJson(res, 500, {message : err.message});
                            console.log(err)
                        }
                        if(results.length > 0){
                            bcrypt.compare(password, results[0].password, (err,isMatch) =>{
                                if(isMatch === true){
                                    const userId = results[0].user_id;
                                    const accessToken = generateToken(userId);
                                    const refreshToken = generateRefreshToken(userId);
                                    saveRefreshToken(userId, refreshToken);

                                    res.send(setResponseJson(res, 200,'로그인 성공',{accessToken, refreshToken}));
                                }else {
                                    res.send(setResponseJson(res, 400, '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요'));
                                    console.log(err)
                                }
                            })
                        }else{
                            setResponseJson(res, 401, '로그인 실패');
                            console.log(err)
                        } 
                    });
                });
            }
        }catch(err){
             res.sned(setResponseJson(res, 500, {message : err.message}));
            console.log(err)
        }
    }
}

module.exports = {
    output,
    process
}