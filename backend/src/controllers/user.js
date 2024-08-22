import express from 'express';
const router = express.Router();
import kakaoRouter from '../api/routes/kakaoLogin.js';
import { mainAuth, auth, unAuth } from '../middlewares/auth';
import * as user from '../controllers/user.controller.js';

const apiUrl = '/api/v1';
const users = '/users';


router.use('/oauth', kakaoRouter);

router.get('/', mainAuth, (req, res) => {
    const { user } = req;
    if (!user) {
        res.render('login_test1');
        return;
    }
    res.render('login_test_main', user);
});

router.get('/test', auth, (req, res) => {
    const { user } = req;
    if (!user) {
        res.render('login_test1');S
    } else {
        res.render('test', user)
    }
})
//비로그인
router.get('/unAuth', unAuth, (req, res) => {
    const { user } = req;
    if (!user) {
        res.render('login_test1');
        return;
    } else {
        res.render('login_test_main', user)
        return;
    }
})

//일반 회원가입
router.post("/signUp", user.process.signUp);
router.get("/signUp", user.output.signUp);
router.get('/check-email', user.output['check-email']);

//로그인
router.get("/signIn", user.output.signIn);
router.post("/signIn", user.process.signIn);

//로그아웃
router.get('/logout', auth, user.output.logout);

//아이디, 비밀번호 찾기
router.post("/reset-password", user.process['reset-password']);
router.post("/change-password", auth, user.process['change-password']);

//비밀번호 찾기 테스트
router.get("/change-password", auth, user.output['change-password']);

//마이페이지
router.get("/me", auth, user.output.me);
router.put("/me", auth, user.process.me);

export default router;