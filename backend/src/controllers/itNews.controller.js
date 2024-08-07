import promisePool from "../../config/db";
import setResponseJson from "../utils/responseDto";



const output = {
    news: (req, res) => {
        res.render('itnews_insert_test');
    }
}
const process = {
    news: async (req, res) => {
        const userId = req.user.payload.userId;
        const { itNewsTitle, itNewsType, itNewsPostion, reward, rewardConfirmYn, startDate, endDate, itNewsTarget, itNewsUrl, itNewsContent } = req.body;
        const data = [userId, itNewsTitle, itNewsType, itNewsPostion, reward, rewardConfirmYn, startDate, endDate, itNewsTarget, itNewsUrl, itNewsContent];
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

    }
}

export { process, output };