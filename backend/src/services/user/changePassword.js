import bcrypt from "bcrypt";
import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";
const output = {
    changePassword: async (req, res) => {
        res.render('pwd_change');
    }
}
const process = {
    changePassword: async (req, res) => {
        const connection = await promisePool.getConnection();
        const { password, newPassword } = req.body;
        const userId = req.user.userId;
        console.log(password)
        const hashedPaaword = bcrypt.hashSync(newPassword, 12);
        const sql = 'UPDATE TB_USER SET password = ?, mod_date = now() where user_id =?';
        const checkSql = 'SELECT password from TB_USER where user_id = ?';
        try {
            await connection.beginTransaction();
            const [checkRows] = await connection.query(checkSql, [userId]);
            console.log(checkRows)
            const checkRowsPassword = checkRows[0].password;

            if (checkRows.length > 0) {
                const isMatch = await bcrypt.compare(password, checkRowsPassword);
                if (!isMatch) {
                    setResponseJson(res, 401, '없는 비밀번호입니다.')
                }
                const [updateResult] = await connection.query(sql, [hashedPaaword, userId]);
                if (updateResult.affectedRows > 0) {
                    setResponseJson(res, 200, '비밀번호 변경에 성공하였습니다.');
                }
            }
        } catch (err) {
            await connection.rollback();
            console.log(err);
            setResponseJson(res, 500, '비밀번호 변경 중 오류가 발생했습니다.', { error: err.message })
        }
    }
}
export const changePassword = { output, process }