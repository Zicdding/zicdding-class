import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";


const output = {

    findOne: async (req, res) => {
        const connection = await promisePool.getConnection();
        const itNewsId = req.query.itNewsId;
        const sql = 'SELECT news.*,JSON_ARRAYAGG(JSON_OBJECT( "content", comment.content, "parent_id", comment.parent_id, "createdDate", comment.created_date, "nickname", user.nickname)) AS comments FROM TB_ITNEWS news' +
            ' LEFT JOIN TB_ITNEWS_COMMENT comment ON news.itnews_id = comment.itnews_id '
            + 'LEFT JOIN TB_USER user ON comment.user_id = user.user_id  WHERE news.itnews_id = ? and news.del_yn ="N" ';
        try {
            let [result] = await connection.query(sql, [itNewsId, itNewsId]);
            setResponseJson(res, 200, '아이티뉴스 상세 조회 성공', { itnews: result[0] });
        } catch (err) {
            console.log(err)
            setResponseJson(res, 500, '조회 중 에러가 발생하였습니다', { error: err.message })
        }
    },

    findAll: async (req, res) => {
        const connection = await promisePool.getConnection();
        const sql = 'SELECT itnews_title, itnews_type, start_date, end_date FROM TB_ITNEWS WHERE del_yn ="N" ORDER BY created_date DESC';
        try {
            await connection.beginTransaction();
            const result = await connection.query(sql);
            await connection.commit();
            setResponseJson(res, 200, '아이티뉴스 리스트 조회 성공', result[0]);
        } catch (err) {
            console.log(err);
            setResponseJson(res, 500, '조회 중 오류 발생', { error: err.message });
        }
    },

}
const process = {
    search: async (req, res) => {
        const connection = await promisePool.getConnection();
        const { itNewsType, itNewsTitle } = req.body;
        let sql = 'SELECT itnews_title, itnews_type, start_date, end_date from TB_ITNEWS where del_yn ="N" ';
        const params = [];
        try {
            await connection.beginTransaction();
            if (itNewsType) {
                sql += 'WHERE itnews_type = ?';
                params.push(itNewsType);
            } else if (itNewsTitle) {
                sql += 'WHERE itnews_title = ?';
                params.push(itNewsTitle);
            } else {
                setResponseJson(res, 200, '아이티뉴스 조회 성공', '조회 목록이 없습니다');
            }
            sql += 'ORDER BY created_date DESC';

            let result = await connection.query(sql, params);
            result = result[0];
            if (result.length > 0) {
                await connection.commit();
                setResponseJson(res, 200, '조회성공', result);
            }
        } catch (err) {
            console.log(err);
            setResponseJson(res, 500, '조회 중 오류 발생', { error: err.message });
        }
    },
}


export const findItNews = { process, output };