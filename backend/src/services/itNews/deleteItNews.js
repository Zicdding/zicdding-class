import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";

const output = {
    delete: (req, res) => {
    },
}
const process = {
    delete: async (req, res) => {
        const connection = await promisePool.getConnection();
        const itNewsId = req.query.itNewsId;
        const userId = req.user.userId;
        const sql = 'UPDATE TB_ITNEWS SET del_yn = "Y" WHERE itnews_id = ? and user_id = ?';
        console.log('삭제' + itNewsId)
        try {
            await connection.beginTransaction();
            let [result] = await connection.query(sql, [itNewsId, userId]);
            if (result.affectedRows > 0) {
                console.log(result)
                await connection.commit();
                setResponseJson(res, 200, '삭제 완료');
            }
        } catch (err) {
            console.log(err)
            setResponseJson(res, 500, '삭제 실패', { error: err.message });
        }

    }
}


export const deleteItNews = { process, output };