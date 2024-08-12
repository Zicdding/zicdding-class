import express from 'express';
import * as userService from '../services/user.service.js';
const router = express.Router();

//일반 회원가입
router.post("/signUp", userService.process.signUp);
router.get("/signUp", userService.output.signUp);
router.get("/check-email", userService.output['check-email']);

//로그인
router.get("/signIn", userService.output.signIn);
router.post("/signIn", userService.process.signIn);

//로그아웃
router.get('/logout', userService.output.logout);

//아이디, 비밀번호 찾기
router.post("/reset-password", userService.process['reset-password']);
router.post("/change-password", userService.process['change-password']);

//비밀번호 찾기 테스트
router.get("/change-password", userService.output['change-password']);

//마이페이지
router.get("/me", userService.output.me);
router.put("/me", userService.process.me);

export default router;