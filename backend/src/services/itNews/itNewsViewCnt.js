import promisePool from '../../../config/db';
import setResponseJson from '../../utils/responseDto';

const output = {
    newsCnt: (req, res) => {
        res.render('itNewsLikeTest');
    }
}
const process = {
    newsCnt: async (req, res) => {
        const { newsId } = req.params;
        const checkSql = 'SELECT * from TB_ITNEWS_VIEW WHERE itnews_id = ?';
        const sql = 'INSERT INTO TB_ITNEWS_LIKE(user_id, itnews_id, created_date) VALUES(?,?,now())';
        const data = [userId, newsId];
        try {
            const [checkResult] = await promisePool.query(checkSql, [userId, newsId]);
            console.log(checkResult[0].length > 1)
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
}


export const LikeItNews = { process, output };