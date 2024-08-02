import express from 'express';
import { generateRefreshToken, saveRefreshToken } from '../../utils/jwt.js';
import promisePool from '../../../config/db.js';
import qs from 'qs';
import axios from 'axios';
import { generateToken } from '../../utils/jwt.js';
import { auth } from '../../middlewares/auth.js';
import setResponseJson from '../../utils/responseDto.js';
const router = express.Router();

const kakaoOpt = {

    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    //redirectUri : process.env.REDIRECT_URI,
    redirectUri: process.env.REDIRECT_URI
};
console.log(kakaoOpt.clientId)

router.get("/kakao", async (req, res) => {
    const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoOpt.clientId}&redirect_uri=${kakaoOpt.redirectUri}&response_type=code`;
    console.log(kakaoLoginURL)
    try {
        res.redirect(kakaoLoginURL);
    } catch (e) {
        console.log(e);
    }
});

router.get('/kakao/callback', async (req, res) => {
    let token;
    const code = req.query.code;
    try {
        const url = 'https://kauth.kakao.com/oauth/token';
        const body = qs.stringify({
            grant_type: 'authorization_code',
            client_id: kakaoOpt.clientId,
            client_secret: kakaoOpt.clientSecret,
            redirectUri: kakaoOpt.redirectUri,
            code: code,
        });


        const header = { 'content-type': 'application/x-www-form-urlencoded' };
        const response = await axios.post(url, body, header);

        token = response.data.access_token;

        try {
            const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const checkSql = 'SELECT * FROM TB_USER where refreshToken = ?'
            const { nickname: nick, profile_img: pf_img, account_email: email } = userResponse.data.properties;
            const payload = { nick, pf_img, email, userId };
            console.log('아이디' + email);
            const accessTokenMake = generateToken(payload);
            const cookieOpt = { maxAge: 1000 * 60 * 60 };
            res.cookie('accessToken', accessTokenMake, cookieOpt);


            const sql = 'INSERT INTO TB_USER(email,password,nickname,created_date) VALUES("","",?,now())';
            const sql2 = 'INSERT INTO TB_USER_SNS(user_id,social_type) VALUES(?,"KAKAO")';

            const [userResult] = await promisePool.query(sql, nick);
            const userId = userResult.insertId;
            const userSnsInsert = await promisePool.query(sql2, userId);
            const refreshToken = generateRefreshToken(userId);
            saveRefreshToken(userId, refreshToken);

            if (userSnsInsert) {

                res.cookie('accessToken', accessTokenMake, {
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
                setResponseJson(res, 200, '카카오로그인성공', { accessTokenMake, refreshToken, userId });
            } else {
                setResponseJson(res, 500, '카카오 로그인 실패')
            }
        } catch (err) {
            console.log(err);
            setResponseJson(res, 500, { error: err.message });
        }
    } catch (err) {
        setResponseJson(res, 500, { error: err.message });
    }



});

router.get('/info', auth, (req, res) => {
    const { user } = req;

    res.render('info', { user });
});

export default router;