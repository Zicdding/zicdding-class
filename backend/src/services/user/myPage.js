import bcrypt from "bcrypt";
import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";
import uploadFileToMinIO from '../../utils/minio';
import encodedFileName from '../../utils/minio';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
const output = {
    me: async (req, res) => {

        const userId = req.user.userId;
        const sql = 'SELECT nickname, email, phone_num FROM TB_USER where user_id = ?';
        try {
            const [rows] = await promisePool.query(sql, [userId]);
            const result = rows[0];
            console.log(rows)
            if (rows.length > 0) {
                setResponseJson(res, 200, "마이페이지 조회 성공", result);
            } else {
                setResponseJson(res, 500, "마이페이지 조회 실패");
            }
        } catch (err) {
            console.log(err);
            setResponseJson(res, 500, "마이페이지 조회 실패", { error: err.message });
        }
    }
}
const process = {
    me: async (req, res) => {
        const connection = await promisePool.getConnection();
        const { nickname, phoneNum } = req.body;
        const newPassword = req.body.newPassword;
        const userId = req.user.userId;
        const sql = `
        UPDATE TB_USER 
        SET 
            nickname = IFNULL(NULLIF(?, ""), nickname), 
            password = IFNULL(NULLIF(?, ""), password), 
            phone_num = IFNULL(NULLIF(?, ""), phone_num) 
            profile_image = IFNULL(NULLIF(?,""), )
        WHERE user_id = ?;`;
        const insertFileSql = `INSERT INTO TB_FILE(target_id,table_name,path,origin_name,change_name) 
                                VALUES(user_id, TB_USER, )`;
        try {
            await connection.beginTransaction();

            const file = req.file;
            const bucketName = 'file';
            const objName = 'users';
            let profileImageUrl = null;
            if (file) {
                const encodedName = encodedFileName(file);
                const originFileName = file.originalName;
                const ext = path.extname(originFileName);
                saveFileName = `zic${uuidv4()}${fileExt}`;
                const imageUrl = `http://121.152.79.226:19000/${bucketName}/${objName}/${encodedName}`;
            }
            //ai자동화ㅉ

            if (newPassword) {
                const hashedPaaword = bcrypt.hashSync(newPassword, 12);
                const values = [
                    nickname || "",
                    hashedPaaword || "",
                    phoneNum || "",
                    userId
                ];
                const rows = await connection.query(sql, values);
                if (rows.affectedRows > 0) {
                    setResponseJson(res, 200, '마이페이지 정보 변경에 성공하였습니다.', rows);
                }
            } else {
                const values = [
                    nickname || "",
                    newPassword || "",
                    phoneNum || "",
                    userId
                ];
                const [rows] = await connection.query(sql, values);
                if (rows.affectedRows > 0) {
                    setResponseJson(res, 200, '마이페이지 정보 변경에 성공하였습니다.');
                }
            }
        } catch (err) {
            await connection.rollback();
            console.log(err);
            setResponseJson(res, 500, '마이페이지 정보 변경 중 오류가 발생했습니다.', { error: err.message })
        }
    },
}

export const myPageService = { output, process }