
import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";
import { date } from '../../utils/datetime';
const output = {
    report: (req, res) => {
        res.render('user_report_test')
    }
}
const process = {
    report: async (req, res) => {
        const userId = req.user.userId;
        const { targetUserId } = req.params;
        let { reasonType, reasonContent } = req.body;
        const time = date();
        console.log(time)
        const targetCheckSql = 'SELECT user_id FROM TB_USER WHERE user_id = ?';
        const reportTypeSql = 'SELECT code, description from TB_CODE WHERE code_group_id = 5 and sort = ?';
        const sql = 'INSERT INTO TB_USER_REPORT(user_id, target_user_id, reason_type, reason_content, created_date) VALUES(?, ?, ?, ?, ?)';
        const connection = await promisePool.getConnection();

        try {
            await connection.beginTransaction();
            console.log(targetUserId)
            const [targetResult] = await connection.query(targetCheckSql, [targetUserId]);
            if (targetResult.length === 0) { //신고 대상 유저 확인 여부
                setResponseJson(res, 500, '해당 유저가 존재하지 않습니다');
            }
            const [reportTypeResult] = await connection.query(reportTypeSql, [reasonType]);
            if (!reportTypeResult) {
                setResponseJson(res, 500, '신고사유 오류');
            }
            reasonType = reportTypeResult[0].code;
            const data = [userId, targetUserId, reasonType, reasonContent, time];
            const [result] = await connection.query(sql, data)
            if (result.affectedRows > 0) {
                await connection.commit();
                setResponseJson(res, 200, '신고가 완료되었습니다.');
            }
        } catch (err) {
            await connection.rollback();
            console.log(err)
            setResponseJson(res, 500, '신고 중 오류가 발생하였씁니다.', { error: err.message })
        } finally {
            connection.release();
        }
    }
}


export const userReportService = { output, process };