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
        console.log(newsId)
        const sql = 'INSERT INTO TB_ITNEWS_LIKE(user_id, itnews_id, created_date) VALUES(?,?,now())';
        const data = [userId, newsId];
        try {
            const [result] = await promisePool.query(sql, data);
            if (result.affectedRows) {
                setResponseJson(res, 200, '좋아요 완료');
            }
        } catch (err) {
            console.log(err)
            setResponseJson(res, 500, '좋아요 실패', { error: err.message });
        }
    },
    newsLikeCancel: async (req, res) => {
        const userId = req.user.userId;
        const { newsId } = req.params;
        console.log(newsId);

        const checkSql = 'SELCT * from TB_ITNEWS_LIKE WHERE user_id = ? and itnews_id = ?';
        try {
            const checkResult = await promisePool.query(checkSql, [userId, newsId]);
            if (checkResult.affectedRows) {
                const delSql = 'DELETE FROM TB_ITNEWS_LIKE WHERE user_id = ? and itnews_id = ?';
                const delResult = await promisePool.query(delSql, [userId, newsId]);
                if (delResult.affectedRows) {
                    setResponseJson(res, 200, '좋아요 취소');
                }
            } else {
                setResponseJson(res, 500, '좋아요 취소 도중 오류 발생')
            }
        } catch (err) {
            setResponseJson(res, 500, '좋아요 취소 도중 오류 발생', { error: err.message })
        }
    }
}


export const LikeItNews = { process, output };