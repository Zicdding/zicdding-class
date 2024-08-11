import bcrypt from "bcrypt";
import { generateToken, generateRefreshToken, saveRefreshToken } from "../../utils/jwt";
import setResponseJson from "../../utils/responseDto";
import promisePool from '../../../config/db';

// FIXME: sql 을 여기서 직접 호출하지 말고 service을 통해서 쓰기 (bcrypt 도 마찬가지)
export async function signUp(req, res) {
  const connection = await promisePool.getConnection();
  const { email, password, nickname, phoneNum } = req.body;
  const passwordBycrpt = bcrypt.hashSync(password, 12);
  const sql = `INSERT 
  INTO TB_USER ( email, password, nickname, phone_num, created_date, mod_date ) 
  VALUES ( ?, ?, ?, ?, now(), now())`;
  const checkSql = 'SELECT email FROM TB_USER WHERE email = ?';
  const data = [email, passwordBycrpt, nickname, phoneNum];
  try {
      const [checkRows] = await connection.query(checkSql, [email]);
      if (checkRows.length > 0) {
          setResponseJson(res, 409, '이미 사용중인 이메일입니다.');
          return;
      }

      await connection.beginTransaction();
      const [rows] = await connection.query(sql, data);
      await connection.commit();
      const userId = rows.insertId;
      const accessToken = generateToken(userId);
      const refreshToken = generateRefreshToken(userId);

      saveRefreshToken(userId, refreshToken);

      res.cookie('accessToken', accessToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: false,
          expires: new Date(Date.now() + 12 * 60 * 60 * 1000) //12시간
      });

      res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: false,
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90일
      });
      setResponseJson(res, 200, '회원가입 완료! 환영합니다', { accessToken, refreshToken, userId });
      await connection.commit();
  } catch (err) {
      await connection.rollback();
      setResponseJson(res, 500, '회원가입 중 오류 발생', { error: err.message })
  } finally {
      connection.release();
  }
}
