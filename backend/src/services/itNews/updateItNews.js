import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";

const output = {
    modify: (req, res) => {
        res.render('itnews_modify_test');
    },
}

const process = {
    modify: async (req, res) => {
        const itNewsId = req.query.itNewsId;
        const userId = req.user.userId;
        const itNewsType = req.body.itNewsType;

        const typeSql = 'SELECT code FROM TB_CODE WHERE code_group_id = 4 AND sort = ?';
        let typeResult;
        let typeRows;
        try {
            typeRows = await promisePool.query(typeSql, itNewsType);
            console.log(typeRows)
            typeResult = typeRows[0][0].code;
            console.log(typeResult)
        } catch (err) {
            console.log(err);
            return setResponseJson(res, 500, { error: '코드 유형 조회 중 오류 발생' });
        }

        const { itNewsTitle, itNewsPostion, reward, rewardConfirmYn, startDate, endDate, itNewsTarget, itNewsUrl, itNewsContent } = req.body;
        const data = [itNewsTitle, typeResult, itNewsPostion, reward, rewardConfirmYn, startDate, endDate, itNewsTarget, itNewsUrl, itNewsContent, userId, userId, itNewsId];

        const sql = 'UPDATE TB_ITNEWS SET itnews_title = ?, itnews_type = ?, itnews_position = ?,'
            + ' reward = ?, reward_confirm_yn = ? , start_date = ? , end_date = ?, '
            + 'itnews_target = ?, itnews_url = ?, itnews_content = ?, mod_user = ?, mod_date = now() WHERE user_id = ? AND itnews_id = ?';

        try {
            const [result] = await promisePool.query(sql, data);
            console.log(sql)
            console.log(result)
            console.log(data)
            if (result.affectedRows > 0) {
                console.log(result.affectedRows);
                setResponseJson(res, 200, '아이티뉴스 수정 성공');
            } else {
                setResponseJson(res, 500, '아이티뉴스 수정 실패');
            }
        } catch (err) {
            console.log(err)
            setResponseJson(res, 500, { error: err.message });
        }
    }
}


export const updateItNews = { process, output };