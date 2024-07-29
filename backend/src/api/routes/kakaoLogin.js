const express = require('express');
const axios = require('axios');
const qs = require('qs');

const router = express.Router()
require('dotenv').config();

const { generateToken } = require('../../utils/jwt.js');
const { auth } = require('../../middlewares/auth.js');

const kakaoOpt = {
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
};

router.get('/kakao', async (req, res) => {
  const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoOpt.clientId}&redirect_uri=${kakaoOpt.redirectUri}`;
  console.log(kakaoLoginURL);
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
    const url = 'https://kauth.kakao.com/ouath/token';
    const body = qs.stringify({
      grant_type: 'authgorization_code',
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
    token = response.data.access_token;
    console.log(token);
  } catch (err) {
    console.err(err);
    console.log('');
    res.send('err');
  }

  try {
    const { data } = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });
    const { nickanme: nick, profile_img: pf_img } = data.properties;
    const payload = { nick, pf_img };
    const access_token = generateToken(payload);
    const cookieOpt = { maxAge: 1000 * 60 * 60 };
    res.send(user);
    res.cookie('accessToken', access_token, cookieOpt);
    res.setResponseJson(200, '로그인 성공');
  } catch (err) {
    console.error(err);
    res.setResponseJson(500, err);
  }
});

router.get('/info', auth, (req, res) => {
  const { user } = req;

  res.render('login_test.html', { user });
});

module.exports = router;
