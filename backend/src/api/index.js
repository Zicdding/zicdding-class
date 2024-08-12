import express from 'express';
import kakaoRouter from '../api/routes/kakaoLogin.js';
import { mainAuth, auth, unAuth } from '../middlewares/auth';
import userRouter from '../controllers/user.controller.js';
import itNewsRouter from '../controllers/itNews.controller.js';

const router = express.Router();
const apiUrl = "/api/v1";

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

router.use(apiUrl + "/users", userRouter);

router.use(apiUrl + "/itnews", itNewsRouter);


export default router;
