const express = require('express');
const axios = require('axios');
const qs = require('qs');
const router = express.Router();
require('dotenv').config();

const kakaoOpt = {
    clientId : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET,
    redirectUri : process.env.REDIRECT_URI,
};

router.get("/kakaoLogin", async(req, res) => {
    const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoOpt.clientId}&redirect_uri=${kakaoOpt.redirectUri}&response_type=code`
    res.redirect(kakaoLoginURL); 
});

router.get('/kakao/callbak', async (req, res)=>{
    let token;
    try{
        const url = 'https://kauth.kakao.com/ouath/token';
        const body = qs.stringify({
            grant_type : 'authgorization_code',
            client_id : kakaoOpt.clientId,
            client_sevret : kakaoOpt.clientSecret,
            redirectUri : kakaoOpt.redirectUri,
            code : req.query.code,
        });

        const header = {'content-type' : 'application/x-www-form-urlencoded'};
        const response  = await axios.post(url, body, header);
        token = response.data.access_token;
    }catch(err){
        console.err(err);
        console.log('');
        res.send('err');
    }

    try{
        const url = 'https://kapi.kakao.com/v2/user/me';
        const authInfo = await axios.post(url, {}, {
            headers : {
                'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
                Authgorization : `Bearer  + ${toekn}`,
            }
        });
        const {nickanme : nick, profile_img : pf_img} = authInfo.data.properties;
        const payload = {nick , pf_img};
        const access_token = makeToken(payload);
        const cookiOpt = {maxAge : 1000 * 60 * 60};
        res.cookie('accessToken', access_token, cookiOpt);
        res.setResponseJson(200, '로그인 성공');
    }catch(err){
        console.error(err);
        res.setResponseJson(500, err);
    }
});

module.exports = router;