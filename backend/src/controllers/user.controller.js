import express from 'express';
import { userService } from '../services/user/user.service.js';
import { mainAuth, auth, unAuth } from '../middlewares/auth.js';
const router = express.Router();


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
        res.render('login_test1'); S
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
router.post("/signUp", userService.process.signUp);
router.get("/signUp", userService.output.signUp);
router.get('/check-email', userService.output.checkEmail);

//로그인
router.get("/signIn", userService.output.signIn);
router.post("/signIn", userService.process.signIn);

//로그아웃
router.get('/logout', auth, userService.output.logout);

//아이디, 비밀번호 찾기
router.post("/reset-password", userService.process.resetPassword);
router.post("/change-password", auth, userService.process.changePassword);

//비밀번호 찾기 테스트페이지
router.get("/change-password", auth, userService.output.changePassword);

//마이페이지
router.get("/me", auth, userService.output.me);
router.put("/me", auth, userService.process.me);

//회원 신고
router.get("/report/:targetUserId", auth, userService.output.report);
router.post("/report/:targetUserId", auth, userService.process.report);

export default router;