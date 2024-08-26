import promisePool from '../../../config/db';
import setResponseJson from '../../utils/responseDto';

export async function deleteClasses(req, res) {
  const userId = req.user.payload.userId;
  const classId = req.params.classId;
  let connection;

  try {
    connection = await promisePool.getConnection();
    await connection.beginTransaction();

    const checkUserSql =
      "SELECT COUNT(*) AS count FROM TB_USER WHERE user_id = ? AND del_yn = 'N' AND suspension_yn = 'N'";
    const checkClassSql = "SELECT COUNT(*) AS count FROM TB_CLASS WHERE class_id = ? AND user_id = ? AND del_yn = 'N'";
    const deleteClassSql = `
      UPDATE TB_CLASS 
      SET del_yn = 'Y', mod_user = ?, mod_date = now() 
      WHERE class_id = ? AND user_id = ?
    `;

    // 사용자 존재 여부 확인
    const [checkUserRows] = await connection.query(checkUserSql, [userId]);

    let checkUserBool = false;
    if (checkUserRows[0].count <= 0) {
      await connection.rollback();
      setResponseJson(res, 409, '존재하지 않는 유저입니다.');
    } else {
      checkUserBool = true;
    }

    // 클래스 존재 여부 확인
    const [checkClassRows] = await connection.query(checkClassSql, [classId, userId]);

    let checkClassBool = false;
    if (checkClassRows[0].count <= 0) {
      await connection.rollback();
      setResponseJson(res, 409, '존재하지 않는 클래스입니다.');
    } else {
      checkClassBool = true;
    }

    if (checkUserBool && checkClassBool) {
      // 유저와 클래스가 존재하는 경우 클래스 정보 수정
      const classData = [userId, classId, userId];
      const [classRows] = await connection.query(deleteClassSql, classData);

      if (classRows.affectedRows > 0) {
        // 포지션 삭제
        const getPositionSql = `
          SELECT position 
          FROM TB_POSITION 
          WHERE class_id = ? AND del_yn = 'N'
        `;
        const [existingPosition] = await connection.query(getPositionSql, [classId]);

        if (existingPosition.length > 0) {
          const deletePositionSql = `
            UPDATE TB_POSITION 
            SET del_yn = 'Y'
            WHERE class_id = ? AND del_yn = 'N'
          `;
          const [deletePositionRows] = await connection.query(deletePositionSql, [classId]);

          if (deletePositionRows.affectedRows === 0) {
            await connection.rollback();
            setResponseJson(res, 401, '클래스 포지션 삭제 실패');
            return;
          }
        }

        // 기술 삭제
        const getTechnologySql = `
          SELECT technology_id 
          FROM TB_CLASS_TECHNOLOGY 
          WHERE class_id = ?
        `;
        const [existingTechnology] = await connection.query(getTechnologySql, [classId]);

        if (existingTechnology.length > 0) {
          const deleteTechnologySql = `
            DELETE FROM TB_CLASS_TECHNOLOGY 
            WHERE class_id = ?
          `;
          const [deleteTechnologyRows] = await connection.query(deleteTechnologySql, [classId]);

          if (deleteTechnologyRows.affectedRows === 0) {
            await connection.rollback();
            setResponseJson(res, 401, '클래스 기술 삭제 실패');
            return;
          }
        }

        await connection.commit();
        setResponseJson(res, 200, '클래스 정보 삭제 완료');
      } else {
        await connection.rollback();
        setResponseJson(res, 401, '클래스 정보 삭제 실패');
      }
    }
  } catch (err) {
    await connection.rollback();
    console.error('클래스 정보 삭제 오류 발생: ', err);
    setResponseJson(res, 400, '클래스 정보 삭제에 오류가 발생하였습니다.', null, err);
  } finally {
    if (connection) connection.release();
  }
}
