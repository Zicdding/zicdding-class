import express from 'express';
import { userService } from '../services/user/userService.js';
import { signUpService } from '../services/user/signUp.js';
import { signInservice } from '../services/user/signIn.js';
import { changePassword } from '../services/user/changePassword.js';
import { myPageService } from '../services/user/myPage.js';
import { userReportService } from '../services/user/userReport.js';
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
router.post("/signUp", signUpService.process.signUp);
router.get("/signUp", signUpService.output.signUp);
router.get('/check-email', userService.output.checkEmail);

//로그인
router.get("/signIn", signInservice.output.signIn);
router.post("/signIn", signInservice.process.signIn);

//로그아웃
router.get('/logout', auth, userService.output.logout);

//비밀번호 초기화
router.post("/reset-password", userService.process.resetPassword);

//비밀번호 찾기
router.get("/change-password", auth, changePassword.output.changePassword); //테스트 페이지
router.post("/change-password", auth, changePassword.process.changePassword);

//마이페이지
router.get("/me", auth, myPageService.output.me);
router.put("/me", auth, myPageService.process.me);

//회원 신고
router.get("/report/:targetUserId", auth, userReportService.output.report);
router.post("/report/:targetUserId", auth, userReportService.process.report);

export default router;