const express = require("express");
const router = express.Router();
const kakaoRouter = require('../api/routes/kakaoLogin.js');
const {mainAuth, auth, unAuth} = require('../middlewares/auth')
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
    res.render('login_test_main',user);
});

router.get('/test', auth, (req,res) =>{
    const {user} = req;
    if(!user){
        res.render('login_test1');
    }else{
        res.render('test',user)
    }
})

router.get('/unAuth', unAuth, (req,res) =>{
    const {user} = req;
    if(!user){
        res.render('unAuthTest');
        return;
    }else{
        res.render('로그인됨',user)
        return;
    }
})

//일반 회원가입
router.post(apiUrl+users+"/signUp", user.process.signUp );
router.get(apiUrl+users+"/signUp", user.output.signUp );
router.get(apiUrl+users+'/check-email', user.output['check-email']);

//로그인
router.get(apiUrl+users+"/signIn", user.output.signIn);
router.post(apiUrl + users + "/signIn" , user.process.signIn);

//로그아웃
router.get(apiUrl+users+'/logout',auth, user.output.logout);

//아이디, 비밀번호 찾기
router.post(apiUrl + users + "/reset-password", user.process['reset-password']);
router.post(apiUrl + users + "/change-password",auth, user.process['change-password']);
//테스트
router.get(apiUrl + users + "/change-password",auth, user.output['change-password']);

//마이페이지
router.get(apiUrl+users+"/me",auth, user.output.me);
router.put(apiUrl + users + "/me", auth, user.process.me);

module.exports = router;