import promisePool from '../../../config/db';
import setResponseJson from '../../utils/responseDto';

export async function insertLike(req, res) {
  const userId = req.user.payload.userId;
  const { classId } = req.params;
  let connection;

  try {
    connection = await promisePool.getConnection();
    await connection.beginTransaction();

    const checkSql = 'SELECT COUNT(*) AS count FROM TB_LIKE WHERE class_id = ? AND user_id = ?';
    const [checkRows] = await connection.query(checkSql, [classId, userId]);

    if (checkRows[0].count === 0) {
      const sql = 'INSERT INTO TB_LIKE (user_id, class_id, created_date) VALUES (?, ?, now())';

      const [rows] = await connection.query(sql, [userId, classId]);
      if (rows.affectedRows > 0) {
        await connection.commit();
        setResponseJson(res, 200, '클래스 좋아요 등록 성공');
      } else {
        await connection.rollback();
        setResponseJson(res, 401, '클래스 좋아요 등록 실패');
      }
    } else {
      await connection.rollback();
      setResponseJson(res, 409, '이미 좋아요가 등록된 클래스 입니다.');
    }
  } catch (err) {
    await connection.rollback();
    console.error('클래스 좋아요 등록 오류 발생: ', err);
    setResponseJson(res, 400, '클래스 좋아요 등록에 오류가 발생하였습니다.', null, err);
  } finally {
    if (connection) connection.release();
  }
}
