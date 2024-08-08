import express from 'express';
const router = express.Router();
import kakaoRouter from '../api/routes/kakaoLogin.js';
import { mainAuth, auth, unAuth } from '../middlewares/auth';
import * as user from '../controllers/user.controller.js';
import * as classes from '../controllers/classes.controller.js';

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
        res.render('login_test1');
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
router.post(apiUrl + users + "/signUp", user.process.signUp);
router.get(apiUrl + users + "/signUp", user.output.signUp);
router.get(apiUrl + users + '/check-email', user.output['check-email']);

//로그인
router.get(apiUrl + users + "/signIn", user.output.signIn);
router.post(apiUrl + users + "/signIn", user.process.signIn);

//로그아웃
router.get(apiUrl + users + '/logout', auth, user.output.logout);

//아이디, 비밀번호 찾기
router.post(apiUrl + users + "/reset-password", user.process['reset-password']);
router.post(apiUrl + users + "/change-password", auth, user.process['change-password']);

//비밀번호 찾기 테스트
router.get(apiUrl + users + "/change-password", auth, user.output['change-password']);

//마이페이지
router.get(apiUrl + users + "/me", auth, user.output.me);
router.put(apiUrl + users + "/me", auth, user.process.me);


// ======================== 클래스 start ========================

// 클래스 리스트 조회 (검색)
router.get(apiUrl + "/classes", classes.output.classesList);

// 클래스 좋아요 등록
router.post(apiUrl + "/classes/:classId/like", auth, classes.process.insertLike);

// 클래스 좋아요 삭제
router.patch(apiUrl + "/classes/:classId/like", auth, classes.process.deleteLike);

// ======================== 클래스 end ========================

export default router;
