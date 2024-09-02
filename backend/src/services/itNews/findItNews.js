import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";

const output = {
    findOne: async (req, res) => {
        const itNewsId = req.query.itNewsId;
        console.log(itNewsId)
        const sql = 'SELECT * FROM TB_ITNEWS WHERE itnews_id = ? and del_yn ="N" ';
        try {
            let result = await promisePool.query(sql, [itNewsId]);
            result = result[0];
            setResponseJson(res, 200, '조회 성공', result);
        } catch (err) {
            setResponseJson(res, 500, '조회 중 에러가 발생하였습니다', { error: err.message })
        }
    },

    findAll: async (req, res) => {
        const sql = 'SELECT itnews_title, itnews_type, start_date, end_date FROM TB_ITNEWS WHERE del_yn ="N" ORDER BY created_date DESC';
        try {
            const result = await promisePool.query(sql);
            setResponseJson(res, 200, '아이티뉴스 리스트 조회 성공', result[0]);
        } catch (err) {
            console.log(err);
            setResponseJson(res, 500, '조회 중 오류 발생', { error: err.message });
        }
    },

}
const process = {
    search: async (req, res) => {
        const { itNewsType, itNewsTitle } = req.body;
        let sql = 'SELECT itnews_title, itnews_type, start_date, end_date from TB_ITNEWS where del_yn ="N" ';
        const params = [];
        try {

            if (itNewsType) {
                sql += 'WHERE itnews_type = ?';
                params.push(itNewsType);
            } else if (itNewsTitle) {
                sql += 'WHERE itnews_title = ?';
                params.push(itNewsTitle);
            } else {
                setResponseJson(res, 200, '조회 성공', '조회 목록이 없습니다');
            }
            sql += 'ORDER BY created_date DESC';

            let result = await promisePool.query(sql, params);
            result = result[0];
            if (result.length > 0) {
                setResponseJson(res, 200, '조회성공', result);
            }
        } catch (err) {
            console.log(err);
            setResponseJson(res, 500, '조회 중 오류 발생', { error: err.message });
        }
    },
}


export const findItNews = { process, output };