import promisePool from '../../../config/db';
import setResponseJson from '../../utils/responseDto';

const output = {
    newsCnt: async (req, res) => {
        const connection = await promisePool.getConnection();
        const { newsId } = req.params;
        const checkSql = 'SELECT * from TB_ITNEWS_VIEW WHERE itnews_id = ?';
        const sql = 'SELECT view_cnt FROM TB_ITNEWS_VIEW WHERE itnews_id = ?';
        const data = newsId;
        try {
            const checkResult = await connection.query(checkSql, data);
            if (checkResult.length > 0) {
                const result = await connection.query(sql, data);
                if (result) {
                    setResponseJson(res, 200, '조회수 가져오기 성공', result[0]);
                }
            }
        } catch (err) {
            console.log(err)
            setResponseJson(res, 500, '조회수 가져오기 실패', { error: err.message })
        }
    }
}
const process = {
    newsCnt: async (req, res) => {
        const connection = await promisePool.getConnection();
        const { newsId } = req.params;
        const checkSql = 'SELECT * from TB_ITNEWS_VIEW WHERE itnews_id = ?';
        const sql = 'UPDATE TB_ITNEWS_VIEW SET view_cnt = view_cnt+1 WHERE itnews_id = ?';
        const data = [newsId];
        try {
            await connection.beginTransaction();
            const [checkResult] = await connection.query(checkSql, data);
            if (checkResult.length > 0) {
                const [result] = await promisePool.query(sql, data);
                if (result.affectedRows) {
                    await connection.commit();
                    setResponseJson(res, 200, '조회수 업데이트 완료');
                }
            }
        } catch (err) {
            console.log(err)
            setResponseJson(res, 500, { error: err.message });
        }
    },
}


export const viewItNews = { process, output };