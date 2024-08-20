import express from 'express';
import { userService } from '../services/user.service.js';
import { mainAuth, auth } from '../middlewares/auth.js';
const router = express.Router();
//일반 회원가입
router.post("/signUp", userService.process.signUp);
router.get("/signUp", userService.output.signUp);
router.get("/checkEmail", userService.output.checkEmail);

//로그인
router.get("/signIn", userService.output.signIn);
router.post("/signIn", userService.process.signIn);

//로그아웃
router.get('/logout', userService.output.logout);

//아이디, 비밀번호 찾기
router.get('/changePassword', auth, userService.output.changePassword);
router.post("/resetPassword", userService.process.resetPassword);
router.post("/changePassword", auth, userService.process.changePassword);

//마이페이지
router.get("/me", auth, userService.output.me);
router.put("/me", auth, userService.process.me);

export default router;
