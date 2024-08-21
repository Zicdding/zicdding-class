import express from 'express';
import userRoutes from './user.js';
import classesRoutes from './classes.js';
import kakaoRouter from '../api/routes/kakaoLogin.js';
import { mainAuth, auth, unAuth } from '../middlewares/auth.js';

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

router.use('/users', userRoutes);
router.use('/classes', classesRoutes);

export default router;