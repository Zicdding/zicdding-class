import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken, saveRefreshToken, replaceAccessToken } from "../utils/jwt";

const getConnection = require('../../config/db');
const setResponseJson = require('../utils/responseDto');


const output = {
    signUp : (req,res) =>{
        res.send('회원가입');
    },
    signIn : (req,res) =>{
        res.render('login_test1.ejs');
    },

    'check-email' : (req, res) => {
        const userEmail = req.body.email;
        const sql = 'SELECT count(email) AS result FROM TB_USER WHERE email = ?;';

        try{
            getConnection((err, connection) => {
                if(err){
                    setResponseJson(res, 500,  { message: err.message });
                    console.log(err)
                }
                connection.query(sql, userEmail, (err,rows,result) => {
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
    signUp : (req, res) => {
        
        const {email, password, nickname, phoneNum} = req.body;
        const passwordBycrpt = bcrypt.hashSync(password, 12);
            
        const sql = `INSERT 
        INTO TB_USER ( email, password, nickname, phone_num, created_date, mod_date ) 
        VALUES ( ?, ?, ?, ?, now(), now())`;
        const checkSql = 'SELECT email FROM TB_USER WHERE email = ?';
        try{
            const data = [email, passwordBycrpt, nickname, phoneNum];
            getConnection((err,connection) => {
                    if(err){
                        setResponseJson(res, 500, err);
                        console.log(err)
                    }

                    connection.query(checkSql, data, (err, result) =>{
                            if(err){
                                connection.release();
                                setResponseJson(res, 500, err);
                                console.log(err)
                            }
                            if(result.length > 0){
                                connection.release();
                                setResponseJson(res, 409, '이미 사용중인 이메일입니다.');
                            }
                            else{
                                connection.query(sql, data, (err, result) => {
                                    const userId = result.insertId;
                                    const accessToken = generateToken(userId);
                                    const refreshToken = generateRefreshToken(userId);
                                    saveRefreshToken(userId, refreshToken);
    
                                    res.cookie('accessToken', accessToken, {
                                        expires: new Date(),
                                        httpOnly : true
                                    });

                                    connection.release();
                                    setResponseJson(res, 200, '회원가입 완료! 환영합니다', {accessToken, refreshToken});
                                    console.log(result);
                                });
                            }
                        });
                });
        }catch(err){
            console.log(err);
        }
    },

    signIn : (req, res )=> {
        const {email, password} = req.body;
        console.log(email)
        const sql = 'SELECT * FROM TB_USER WHERE email = ?';
        try{
            if(email && password) {
                getConnection((err,connection)=>{
                    if(err){
                        setResponseJson(res, 500, {message : err.message});
                        console.log(err);
                    }

                    connection.query(sql, [email,password], (err, results)=>{
                        if(err){
                            connection.release();
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
                                    res.cookie('accessToken', accessToken, {
                                        httpOnly : true,
                                        secure : false,
                                        sameSite : 'strict'
                                    })
                                  res.status(200).json({messgae : '로그인 성공', accessToken, refreshToken,userId})
                                  
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
             res.send(setResponseJson(res, 500, {message : err.message}));
            console.log(err)
        }
    },

    replaceToken : (req, res) =>{
        const refreshToken = req.cookies.accessToken;
        if(!refreshToken)
            return res.send(setResponseJson(res,403, '리프레시 토큰 만료'));

        replaceAccessToken(refreshToken)
            .then((newAccessToken) => {
                res.send(setResponseJson(res, 200, '토큰 재발급', {accessToken : newAccessToken}))
            })
            .catch((err) => {
                res.send(setResponseJson(res, 403, {message : err.message}))
            })
    }
}



module.exports = {
    output,
    process
}