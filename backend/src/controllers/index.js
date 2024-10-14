import express from 'express';
import userRoutes from './user.controller.js';
import classesRoutes from './classes.controller.js';
import itNewsRoutes from './itNews.controller.js';
import kakaoRouter from '../api/routes/kakaoLogin.js';
import { mainAuth, auth, unAuth } from '../middlewares/auth.js';
import uploadRoutes from './upload.controller.js'
const router = express.Router();

//카카오로그인
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
    res.render('test', user);
  }
});

//비로그인
router.get('/unAuth', unAuth, (req, res) => {
  const { user } = req;
  if (!user) {
    res.render('login_test1');
    return;
  } else {
    res.render('login_test_main', user);
    return;
  }
});

router.use('/users', userRoutes);
router.use('/classes', classesRoutes);
router.use('/itNews', itNewsRoutes)
router.use('/upload', uploadRoutes)

export default router;
