import bcrypt from "bcryptjs";
import { generateRefreshToken, generateToken, saveRefreshToken, replaceAccessToken, updateRefreshToken } from "../utils/jwt";
import { resetUserPassword } from "../utils/users";
const getConnection = require('../../config/db');
const setResponseJson = require('../utils/responseDto');


const output = {
    signUp : (req,res) =>{
        res.send('회원가입');
    },
    signIn : (req,res) =>{
        res.render('login_test1.ejs');
    },
    logout : (req,res) =>{
              res.clearCookie('accessToken');
              res.clearCookie('refreshToken');
              res.send(setResponseJson(res,200,'로그아웃 성공'));
              console.log('삭제') 
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
                        res.send(setResponseJson(res, 500, err));
                        console.log(err)
                    }
                    connection.query(checkSql, data, (err, result) =>{
                            if(err){
                                connection.release();
                                res.send(setResponseJson(res, 500, err));
                                console.log(err)
                            }
                            if(result.length > 0){
                                connection.release();
                                res.send(setResponseJson(res, 409, '이미 사용중인 이메일입니다.'));
                            }
                            else{
                                connection.query(sql, data, (err, result) => {
                                    const userId = result.insertId;
                                    const accessToken = generateToken(userId);
                                    const refreshToken = generateRefreshToken(userId);
                                    saveRefreshToken(userId, refreshToken);
    
                                    res.cookie('accessToken', accessToken, {
                                        httpOnly : true,
                                        sameSite: 'strict',
                                        secure : false,
                                       expires: new Date(Date.now() + 12 * 60 * 60 * 1000) //12시간
                                    });
                                    res.cookie('refreshToken', refreshToken, {
                                        httpOnly: true,
                                        sameSite: 'strict',
                                        secure : false,
                                        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90일
                                    });
                                    connection.release();
                                    res.send(setResponseJson(res, 200, '회원가입 완료! 환영합니다', {accessToken, refreshToken}));
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
                        res.send(setResponseJson(res, 500, {message : err.message}));
                        console.log(err);
                    }

                    connection.query(sql, [email,password], (err, results)=>{
                        if(err){
                            connection.release();
                            res.send(setResponseJson(res, 500, {message : err.message}));
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
                                        sameSite: 'strict',
                                        secure : false,
                                       expires: new Date(Date.now() + 12 * 60 * 60 * 1000)
                                    });
                                    res.cookie('refreshToken', refreshToken, {
                                        httpOnly: true,
                                        sameSite: 'strict',
                                        secure : false,
                                        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90일
                                    });
                                   res.send(setResponseJson(res,200,{messgae : '로그인 성공', accessToken, refreshToken,userId}));
                                  
                                }else {
                                    res.send(setResponseJson(res, 400, '아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.입력하신 내용을 다시 확인해주세요.'));
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
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken)
            return res.send(setResponseJson(res ,403, '토큰 만료'));

        updateRefreshToken(refreshToken)
        .then((newRefreshToken) => {
            replaceAccessToken(newRefreshToken)
                .then((newAccessToken) => {
                    setTokensInCookies(res, newAccessToken, newRefreshToken);
                    res.send(setResponseJson(res, 200, '토큰 재발급', { accessToken: newAccessToken, refreshToken: newRefreshToken }));
                })
                .catch((err) => {
                    res.send(setResponseJson(res, 403, err.message));
                });
        })
        .catch((err) => {
            res.send(setResponseJson(res, 403, err.message));
        });
    },

    'reset-password' :  (req, res) => {
        const email = req.body.email;     
         if (!email) {
            res.send(setResponseJson(res,404,'이메일을 입력하세요.'));
        }
        const sql = 'SELECT * FROM TB_USER WHERE email = ?';
        getConnection((err,connection)=>{
            if(err){
                console.log(err)
            }
            connection.query(sql, email ,(err,result)=>{
                connection.release();
                if(err){
                    console.log(err)
                }
                if (result.length > 0) {
                    const userId = result[0].user_id;
                    resetUserPassword(userId, email);
                    } else {
                    res.send(setResponseJson(res, 404, '존재하지 않는 ID입니다.'));
                }
            })
        }) 
    },
    'change-password' : async (req,res) =>{
        const {password, newPassword}  = req.body;
        const {userId} = req.body;

        const hashedPaaword = bcrypt.hashSync(newPassword, 12);
        const sql = 'UPDATE TB_USER SET password = ?, mod_date = now() where user_id =?';
        const checkSql = 'SELECT password from TB_USER where user_id = ?';
        getConnection((err,connection) =>{
            if(err) console.log(err)
            connection.query(checkSql,[userId], (err,result) => {
                if(err){
                    connection.release();
                    res.send(setResponseJson(res, 500, {message : err.message}));
                }
                if(result.length > 0){        
                    if(err) console.log(err)
                    bcrypt.compare(password, result[0].password, (err,isMatch) =>{ 
                        if(isMatch === true){
                           connection.query(sql,[hashedPaaword, userId],(err,result)=>{
                            if(err){
                                connection.release();
                                res.send(setResponseJson(res, 500, {message : err.message})); 
                            }
                            console.log(result)
                            res.send(setResponseJson(res,200, {message : 'success'}));
                           })
                    }
                });
                }else{
                    console.log(err)
                }
            })
        })
    }
}



module.exports = {
    output,
    process
}