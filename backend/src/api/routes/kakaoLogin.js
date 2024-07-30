import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { generateRefreshToken, saveRefreshToken } from '../../utils/jwt.js';
import promisePool from '../../../config/db.js';
import qs from 'qs';
import { generateToken } from '../../utils/jwt.js';
import { auth } from '../../middlewares/auth.js';
import setResponseJson from '../../utils/responseDto.js';
dotenv.config();

const router = express.Router();


const kakaoOpt = {

    clientId: '153994fbdf5f25b41659b9c79b0a4ffe',
    clientSecret: '3u9uGiDlx1eS5GZXXGl4FlvRffH644hY',
    //redirectUri : process.env.REDIRECT_URI,
    redirectUri: 'http://localhost:3000/oauth/kakao/callback'
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
            const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { nickname: nick, profile_img: pf_img } = response.data.properties;
            const payload = { nick, pf_img };
            console.log(nick);
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