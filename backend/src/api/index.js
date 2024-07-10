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
        res.render('login_test1');
        return;
    }
    res.render('login_test',{user});
});

router.get(apiUrl+users+'/logout', unAuth, (req,res) => {
    res.clearCookie('accessToken');
    res.send('로그아웃');
});

//일반 회원가입
router.post(apiUrl+users+"/signUp", user.process.signUp );
router.get(apiUrl+users+"/signUp", user.output.signUp );
router.get(apiUrl+users+'/check-email', user.output['check-email']);

//로그인
router.get(apiUrl+users+"/signIn", user.output.signIn);
router.post(apiUrl + users + "/signIn" , user.process.signIn);

module.exports = router;