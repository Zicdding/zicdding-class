import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";

const output = {
    delete: (req, res) => {

    },
}
const process = {
    delete: async (req, res) => {
        const itNewsId = req.query.itNewsId;
        console.log('삭제' + itNewsId)
        const userId = req.user.userId;
        const sql = 'UPDATE TB_ITNEWS SET del_yn = "Y" WHERE itnews_id = ? and user_id = ?';
        try {
            let [result] = await promisePool.query(sql, [itNewsId, userId]);
            if (result.affectedRows > 0) {
                console.log(result)
                setResponseJson(res, 200, '삭제 완료');
            } else {
                setResponseJson(res, 404, '삭제 실패');
            }
        } catch (err) {
            console.log(err)
            setResponseJson(res, 500, { error: err.message });
        }

    }
}


export const deleteItNews = { process, output };