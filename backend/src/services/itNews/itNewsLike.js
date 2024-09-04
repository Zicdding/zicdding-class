import promisePool from '../../../config/db';
import setResponseJson from '../../utils/responseDto';

const output = {
    newsLike: (req, res) => {
        res.render('itNewsLikeTest');
    },
    newsDel: (req, res) => {
        res.render('itNewsDeleteTest');
    },

}
const process = {
    newsLike: async (req, res) => {
        const userId = req.user.userId;
        const { newsId } = req.params;
        const checkSql = 'SELECT SQL_NO_CACHE * from TB_ITNEWS_LIKE WHERE user_id = ? and itnews_id = ?';
        const sql = 'INSERT INTO TB_ITNEWS_LIKE(user_id, itnews_id, created_date) VALUES(?,?,now())';
        const data = [userId, newsId];
        try {
            const [checkResult] = await promisePool.query(checkSql, [userId, newsId]);

            if (checkResult.length > 0) {
                setResponseJson(res, 409, '이미 좋아요를 누른 상태입니다.');
                return;
            } else {
                const [result] = await promisePool.query(sql, data);
                if (result.affectedRows) {
                    setResponseJson(res, 200, '좋아요 완료');
                }
            }
        } catch (err) {
            console.log(err)
            setResponseJson(res, 500, '좋아요 실패', { error: err.message });
        }
    },
    newsLikeCancel: async (req, res) => {
        const userId = req.user.userId;
        const { newsId } = req.params;

        const checkSql = 'SELECT * from TB_ITNEWS_LIKE WHERE user_id = ? and itnews_id = ?';
        try {
            const checkResult = await promisePool.query(checkSql, [userId, newsId]);
            console.log(checkResult)
            if (checkResult[0].length != 0) {
                const delSql = 'DELETE FROM TB_ITNEWS_LIKE WHERE user_id = ? and itnews_id = ?';
                const [delResult] = await promisePool.query(delSql, [userId, newsId]);
                if (delResult.affectedRows) {
                    setResponseJson(res, 200, '좋아요 취소');
                }
            }
        } catch (err) {
            setResponseJson(res, 500, '좋아요 취소 실패', { error: err.message })
        }
    }
}


export const LikeItNews = { process, output };