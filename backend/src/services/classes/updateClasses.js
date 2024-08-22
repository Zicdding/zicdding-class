import promisePool from '../../../config/db';
import setResponseJson from '../../utils/responseDto';

export async function updateClasses(req, res) {
  const userId = req.user.payload.userId;
  const classId = req.params.classId;
  const {
    classTitle,
    recruitmentYn,
    classHow,
    classType,
    estConfirmYn,
    estMonth,
    headcount,
    contectType,
    contectUrl,
    content,
    position,
    technology,
  } = req.body;
  const startDate = new Date(req.body.startDate);
  const endDate = new Date(req.body.endDate);

  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    const checkUserSql =
      "SELECT COUNT(*) AS count FROM TB_USER WHERE user_id = ? AND del_yn = 'N' AND suspension_yn = 'N'";
    const updateClassSql = `
      UPDATE TB_CLASS 
      SET class_title = ?, recruitment_yn = ?, start_date = ?, end_date = ?, class_how = ?, class_type = ?, 
          est_confirm_yn = ?, est_month = ?, headcount = ?, contect_type = ?, contect_url = ?, content = ?, 
          mod_user = ?, mod_date = now()
      WHERE class_id = ? AND user_id = ?
    `;

    // 사용자 존재 여부 확인
    const [checkUserRows] = await connection.query(checkUserSql, [userId]);

    if (checkUserRows[0].count > 0) {
      // 유저가 존재하는 경우 클래스 정보 수정
      const classData = [
        classTitle,
        recruitmentYn,
        startDate,
        endDate,
        classHow,
        classType,
        estConfirmYn,
        estMonth,
        headcount,
        contectType,
        contectUrl,
        content,
        userId,
        classId,
        userId,
      ];

      const [classRows] = await connection.query(updateClassSql, classData);

      if (classRows.affectedRows > 0) {
        // 기존 포지션 삭제 및 추가
        const getPositionSql = "SELECT position FROM TB_POSITION WHERE class_id = ? AND del_yn = 'N'";
        const [existingPosition] = await connection.query(getPositionSql, [classId]);

        const deletedPosition = existingPosition.filter((pos) => !position.includes(pos.position));

        const existingPositionToKeep = existingPosition.filter((pos) => position.includes(pos.position));

        // 삭제된 포지션 삭제
        for (let i = 0; i < deletedPosition.length; i++) {
          const deletePositionSql = "UPDATE TB_POSITION SET del_yn = 'Y' WHERE class_id = ? AND position = ?";
          const deletePositionData = [classId, deletedPosition[i].position];

          const [deletePositionRows] = await connection.query(deletePositionSql, deletePositionData);
          if (deletePositionRows.affectedRows === 0) {
            await connection.rollback();
            setResponseJson(res, 401, '클래스 포지션 삭제 실패');
            return;
          }
        }

        // 새로운 포지션 추가
        for (let i = 0; i < position.length; i++) {
          if (!existingPositionToKeep.some((pos) => pos.position === position[i])) {
            const insertPositionSql = 'INSERT INTO TB_POSITION (class_id, position) VALUES (?, ?)';
            const positionData = [classId, position[i]];

            const [positionRows] = await connection.query(insertPositionSql, positionData);
            if (positionRows.affectedRows === 0) {
              await connection.rollback();
              setResponseJson(res, 401, '클래스 포지션 추가 실패');
              return;
            }
          }
        }

        // 기존 기술 삭제 및 추가
        const getTechnologySql = 'SELECT technology_id FROM TB_CLASS_TECHNOLOGY WHERE class_id = ?';
        const [existingTechnology] = await connection.query(getTechnologySql, [classId]);

        const deletedTechnology = existingTechnology.filter((tech) => !technology.includes(tech.technology_id));

        const existingTechnologyToKeep = existingTechnology.filter((tech) => technology.includes(tech.technology_id));

        // 삭제된 기술 삭제
        for (let i = 0; i < deletedTechnology.length; i++) {
          const deleteTechnologySql = 'DELETE FROM TB_CLASS_TECHNOLOGY WHERE class_id = ? AND technology_id = ?';
          const deleteTechnologyData = [classId, deletedTechnology[i].technology_id];

          const [deleteTechnologyRows] = await connection.query(deleteTechnologySql, deleteTechnologyData);
          if (deleteTechnologyRows.affectedRows === 0) {
            await connection.rollback();
            setResponseJson(res, 401, '클래스 기술 삭제 실패');
            return;
          }
        }

        // 새로운 기술 추가
        for (let i = 0; i < technology.length; i++) {
          if (!existingTechnologyToKeep.some((tech) => tech.technology_id === technology[i])) {
            const insertTechnologySql = 'INSERT INTO TB_CLASS_TECHNOLOGY (class_id, technology_id) VALUES (?, ?)';
            const technologyData = [classId, technology[i]];

            const [technologyRows] = await connection.query(insertTechnologySql, technologyData);
            if (technologyRows.affectedRows === 0) {
              await connection.rollback();
              setResponseJson(res, 401, '클래스 기술 추가 실패');
              return;
            }
          }
        }

        await connection.commit();
        setResponseJson(res, 200, '클래스 정보 수정 완료');
      } else {
        await connection.rollback();
        setResponseJson(res, 401, '클래스 정보 수정 실패');
      }
    } else {
      await connection.rollback();
      setResponseJson(res, 401, '존재하지 않는 유저입니다.');
    }
  } catch (err) {
    await connection.rollback();
    console.error('클래스 정보 수정 오류 발생: ', err);
    setResponseJson(res, 400, '클래스 정보 수정에 오류가 발생하였습니다.', null, err);
  } finally {
    if (connection) connection.release();
  }
}
