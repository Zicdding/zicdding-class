import promisePool from '../../../config/db';
import setResponseJson from "../../utils/responseDto";

export async function deleteLike (req, res) {
    const userId = req.user.payload.userId;
    const { classId } = req.params;
    let connection;
    
    try {
        connection = await promisePool.getConnection();
        await connection.beginTransaction();

        const sql = `
            DELETE FROM TB_LIKE WHERE user_id = ? AND class_id = ?;
        `;

        const [rows] = await connection.query(sql, [userId, classId]);
        if (rows.affectedRows  > 0) {
            await connection.commit();
            setResponseJson(res, 200, '클래스 좋아요 삭제 성공');
        } else {
            await connection.rollback();
            setResponseJson(res, 401, '클래스 좋아요 삭제 실패');
        }
    } catch (err) {
        await connection.rollback();
        console.error(err);
        setResponseJson(res, 400, '클래스 좋아요 삭제에 오류가 발생하였습니다. ');
    } finally {
        if (connection) connection.release();
    }
};