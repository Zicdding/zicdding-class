const express = require("express");
const router = express.Router();
const kakaoRouter = require('../api/routes/kakaoLogin.js');
const {mainAuth, unAuth} = require('../middlewares/auth')
const user = require('../controllers/user.controller.js')

const apiUrl = '/api/v1';
const users = '/users';


router.use('/oauth',kakaoRouter);

router.get('/', mainAuth, (req, res) => {
    const { user } = req;
    if(!user){
        res.render('login_test.html');
        return;
    }
    res.render('login_test.html',{user});
});

router.get('/logout', unAuth, (req,res) => {
    res.clearCookie('accessToken');
    res.send('로그아웃');
});

//일반 회원가입
router.post(apiUrl+users+"/signup", user.process.signup );
router.get(apiUrl+users+"/signup", user.output.signup );
router.get(apiUrl+users+'/check-email', user.output['check-email']);

//로그인
router.post(apiUrl + users + "/signIn" , user.process.signIn);

module.exports = router;