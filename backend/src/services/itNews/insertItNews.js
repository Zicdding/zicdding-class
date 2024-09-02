import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";

const output = {
    view: (req, res) => {
        res.render('itnews_insert_test');
    },

}
const process = {
    news: async (req, res) => {
        const userId = req.user.userId;
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
            setResponseJson(res, 500, '작성 실패', { error: err.message });
        }
    },
}


export const insertItNews = { process, output };