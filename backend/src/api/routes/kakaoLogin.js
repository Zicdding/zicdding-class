const express = require('express');
const router = express.Router();
require('dotenv').config();

import axios from 'axios';
import qs from 'qs';
import generateToken from '../../utils/jwt.js';
import auth from '../../middlewares/auth.js';
import { setResponseJson } from "../../utils/responseDto.js"

const kakaoOpt = {

    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
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


        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const accessToken = response.data.access_token;
        console.log(response.data.access_token)
        try {
            const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const { nickanme: nick, profile_img: pf_img } = response.data.properties;
            const payload = { nick, pf_img };
            console.log(nick);
            const accessToken = generateToken(payload);
            const cookieOpt = { maxAge: 1000 * 60 * 60 };
            res.send(user);
            res.cookie('accessToken', accessToken, cookieOpt);
            setResponseJson(200, '로그인 성공');
        } catch (err) {
            console.error(err);
        }
    } catch (err) {
        console.log(err);
        res.send('err');
    }


});

router.get('/info', auth, (req, res) => {
    const { user } = req;

    res.render('info', { user });
});

module.exports = router