import promisePool from '../../../config/db';
import setResponseJson from "../../utils/responseDto";

export async function insertLike (req, res) {
    const userId = req.user.payload.userId;
    const { classId } = req.params;
    let connection;
    
    try {
        connection = await promisePool.getConnection();
        await connection.beginTransaction();

        const sql = `
            INSERT INTO TB_LIKE (user_id, class_id, created_date) VALUES (?, ?, now());
        `;
        
        const [rows] = await connection.query(sql, [userId, classId]);
        if (rows.affectedRows  > 0) {
            await connection.commit();
            setResponseJson(res, 200, '클래스 좋아요 등록 성공');
        } else {
            await connection.rollback();
            setResponseJson(res, 401, '클래스 좋아요 등록 실패');
        }
    } catch (err) {
        await connection.rollback();
        console.error(err);
        setResponseJson(res, 400, '클래스 좋아요 등록에 오류가 발생하였습니다. ');
    } finally {
        if (connection) connection.release();
    }
};