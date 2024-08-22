import express from 'express';
import kakaoRouter from '../api/routes/kakaoLogin.js';
import { mainAuth, auth, unAuth } from '../middlewares/auth';
import userRouter from '../controllers/user.controller.js';
import itNewsRouter from '../controllers/itNews.controller.js';

const router = express.Router();

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

router.use("/api/v1/users", userRouter);
router.use("/api/v1/itnews", itNewsRouter);



// ======================== 클래스 start ========================

// 클래스 리스트 조회 (검색)
router.get(apiUrl + "/classes", classes.output.classesList);

// 클래스 좋아요 등록
router.post(apiUrl + "/classes/:classId/like", auth, classes.process.insertLike);

// 클래스 좋아요 삭제
router.patch(apiUrl + "/classes/:classId/like", auth, classes.process.deleteLike);

// ======================== 클래스 end ========================

export default router;
