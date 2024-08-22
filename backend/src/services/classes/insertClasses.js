import promisePool from '../../../config/db';
import setResponseJson from '../../utils/responseDto';

export async function insertClasses(req, res) {
  const userId = req.user.payload.userId;
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
    const insertClassSql = `
      INSERT INTO TB_CLASS 
        (user_id, class_title, recruitment_yn, start_date, end_date, class_how, class_type, 
          est_confirm_yn, est_month, headcount, contect_type, contect_url, content, del_yn, 
          created_date, mod_user, mod_date) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'N', now(), ?, now())
    `;

    // 사용자 존재 여부 확인
    const [checkUserRows] = await connection.query(checkUserSql, [userId]);

    if (checkUserRows[0].count > 0) {
      // 유저가 존재하는 경우 클래스 등록
      const classData = [
        userId,
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
      ];

      const [classRows] = await connection.query(insertClassSql, classData);

      if (classRows.affectedRows > 0) {
        const classId = classRows.insertId;

        // 포지션 추가
        for (let i = 0; i < position.length; i++) {
          const insertPositionSql = 'INSERT INTO TB_POSITION (class_id, position) VALUES (?, ?)';
          const positionData = [classId, position[i]];

          const [positionRows] = await connection.query(insertPositionSql, positionData);
          if (positionRows.affectedRows === 0) {
            await connection.rollback();
            setResponseJson(res, 401, '클래스 포지션 등록 실패');
            return;
          }
        }

        // 기술 추가
        for (let i = 0; i < technology.length; i++) {
          const insertTechnologySql = 'INSERT INTO TB_CLASS_TECHNOLOGY (class_id, technology_id) VALUES (?, ?)';
          const technologyData = [classId, technology[i]];

          const [technologyRows] = await connection.query(insertTechnologySql, technologyData);
          if (technologyRows.affectedRows === 0) {
            await connection.rollback();
            setResponseJson(res, 401, '클래스 기술 등록 실패');
            return;
          }
        }

        // 모든 작업 성공 시 커밋
        await connection.commit();
        setResponseJson(res, 200, '클래스 등록 완료', classId);
      } else {
        await connection.rollback();
        setResponseJson(res, 401, '클래스 등록 실패');
      }
    } else {
      await connection.rollback();
      setResponseJson(res, 401, '존재하지 않는 유저입니다.');
    }
  } catch (err) {
    await connection.rollback();
    console.error('클래스 등록 오류 발생: ', err);
    setResponseJson(res, 400, '클래스 등록에 오류가 발생하였습니다.', null, err);
  } finally {
    if (connection) connection.release();
  }
}
