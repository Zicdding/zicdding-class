import promisePool from "../../config/db";
import setResponseJson from "../utils/responseDto";

const output = {
    view: (req, res) => {
        res.render('itnews_insert_test');
    },
    findOne: async (req, res) => {
        const itNewsId = req.query.itNewsId;
        console.log(itNewsId)
        const sql = 'SELECT * FROM TB_ITNEWS WHERE itnews_id = ?';
        try {
            let result = await promisePool.query(sql, [itNewsId]);
            result = result[0];
            setResponseJson(res, 200, '조회 성공', result);
        } catch (err) {
            setResponseJson(res, 500, '조회 중 에러가 발생하였습니다', { error: err.mesaage })
        }
    },
    findAll: async (req, res) => {
        const sql = 'SELECT itnews_title, itnews_type, start_date, end_date from TB_ITNEWS ORDER BY created_date DESC';
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
    news: async (req, res) => {
        const userId = req.user.payload.userId;
        const itNewsType = req.body.itNewsType;
        console.log(itNewsType)
        const typeSql = 'SELECT sort FROM TB_CODE where code_group_id = 4 and code = ?';
        let typeResult = await promisePool.query(typeSql, itNewsType);
        typeResult = typeResult[0][0].description;
        console.log(typeResult);
        const { itNewsTitle, itNewsPostion, reward, rewardConfirmYn, startDate, endDate, itNewsTarget, itNewsUrl, itNewsContent } = req.body;
        const data = [userId, itNewsTitle, typeResult, itNewsPostion, reward, rewardConfirmYn, startDate, endDate, itNewsTarget, itNewsUrl, itNewsContent];
        const sql = 'INSERT INTO TB_ITNEWS(user_id, itnews_title, itnews_type, itnews_position, reward, reward_confirm_yn, start_date, end_date, itnews_target, itnews_url, itnews_content, created_date) '
            + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now())';

        try {
            const result = await promisePool.query(sql, data);
            if (result) {
                setResponseJson(res, 200, '작성 완료');
            }
        } catch (err) {
            console.log(err)
            setResponseJson(res, 500, '작성 실패', { error: err.mesaage });
        }
    },
    search: async (req, res) => {
        const { itNewsType, itNewsTitle } = req.body;
        let sql = 'SELECT itnews_title, itnews_type, start_date, end_date from TB_ITNEWS ';
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
    }
}

export const itNewsService = { process, output };