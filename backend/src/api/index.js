const express = require("express");
const kakaoRouter = require('../api/routes/kakaoLogin.js');

const {mainAuth, unAuth} = require('../middlewares/auth.js')

const router = express.Router();

router.use('/auth',kakaoRouter);

router.get('/', mainAuth, (req, res) => {
    const { user } = req;
    if(!user){
        res.render('login_test.html');
        return;
    }
    res.render('login_test.html',{user});
});
/*
router.get('/logout', unAuth, (req,res) => {
    res.clearCookie('accessToken');
    res.send('로그아웃');
});
*/
module.exports = router;