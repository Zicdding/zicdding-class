import { uploadFileToMinIO, encodeFileName } from '../../utils/minio';
import promisePool from "../../../config/db";
import setResponseJson from "../../utils/responseDto";
import { generatedFileName } from '../../utils/multer';
import { date } from '../../utils/datetime';
const output = {
    view: (req, res) => {
        res.render('itnews_insert_test');
    },
    comments: (req, res) => {
        res.render('commentTest');
    }

}
const process = {
    news: async (req, res) => {
        const connection = await promisePool.getConnection();
        const userId = req.user.userId;
        const itNewsType = req.body.itNewsType;
        const dateTime = date();
        const typeSql = 'SELECT code FROM TB_CODE where code_group_id = 4 and sort = ?';
        const { itNewsTitle, itNewsPostion, reward, rewardConfirmYn, startDate, endDate, itNewsTarget, itNewsUrl, itNewsContent } = req.body;
        const sql = 'INSERT INTO TB_ITNEWS(user_id, itnews_title, itnews_type, itnews_position, reward, reward_confirm_yn, start_date, end_date, itnews_target, itnews_url, itnews_content, created_date) '
            + 'VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const cntSql = 'INSERT INTO TB_ITNEWS_VIEW(user_id, itnews_id, view_cnt, created_date)'
            + 'VALUES(?, ?, 0, ?)';
        const cntCheckSql = 'SELECT * FROM TB_ITNEWS_VIEW where itnews_id = ?';
        console.log(req.body)
        let typeResult;
        let uploadFiles = [];
        try {
            await connection.beginTransaction();
            const [typeRows] = await connection.query(typeSql, [itNewsType]);
            if (typeRows.length === 0) {
                await connection.rollback();
                setResponseJson(res, 404, '없는 itNewsType')
            }
            typeResult = typeRows[0].code;
            //type end

            const data = [userId, itNewsTitle, typeResult, itNewsPostion, reward, rewardConfirmYn, startDate, endDate, itNewsTarget, itNewsUrl, itNewsContent, dateTime];

            const [insertResult] = await connection.query(sql, data);
            if (insertResult.affectedRows === 0) {
                await connection.rollback();
                return setResponseJson(res, 500, 'IT 뉴스 삽입 실패');
            }
            const insertedNewsId = insertResult.insertId;

            const [checkRows] = await connection.query(cntCheckSql, [insertedNewsId])
            if (checkRows.length === 0) {
                await connection.query(cntSql, [userId, insertedNewsId, dateTime]);
            }
            //insertitnews end

            const files = req.files;
            let imageUrls = [];
            const bucketName = 'file';
            const objName = 'news';
            uploadFiles = await uploadFileToMinIO(bucketName, files, objName);
            if (files) {
                for (const file of files) {
                    const encodedName = encodeFileName(file.filename);
                    const imageUrl = `http://121.152.79.226:19000/${bucketName}/${objName}/${encodedName}`;
                    imageUrls.push(imageUrl); // URL 배열에 추가
                    const originName = file.originalname; // 원본 파일 이름
                    const ext = originName.split('.').pop();
                    const fileInsertSql = 'INSERT INTO TB_FILE (target_id, table_name, path, origin_name, changed_name, ext,created_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
                    await connection.query(fileInsertSql, [
                        insertedNewsId, // use insertedNewsId here
                        'TB_ITNEWS',
                        imageUrl, // path
                        originName,
                        encodedName,
                        ext,
                        dateTime
                    ]);
                }
            }
            //file end
            await connection.commit();
            setResponseJson(res, 200, 'ITNEWS 작성 완료');
        } catch (err) {
            console.log(err)
            await connection.rollback();
            if (uploadFiles.length > 0) {
                const bucketName = 'file';
                const objName = 'news';
                for (const file of uploadFiles) {
                    const encodedName = encodedName(file.filename);
                    const insertObjName = `${objName}/${encodedName}`;
                    await deleteFileFromMinIO(bucketName, insertObjName);
                }
            }
            setResponseJson(res, 500, '작성 실패', { error: err.message });
        } finally {
            if (connection) connection.release();
        }

    },
    comments: async (req, res) => {
        const connetion = await promisePool.getConnection();
        const user = req.user.userId;
        const dateTime = date();
        const { itnewsId, content, parentId } = req.body;
        console.log(content, user)
        const sql = 'INSERT INTO TB_ITNEWS_COMMENT(user_id, itnews_id, parent_id, content, created_date) VALUES(?,?,?,?,?)'
        try {
            await connetion.beginTransaction();
            const result = await connetion.query(sql, [user, itnewsId, parentId || null, content, dateTime]);
            if (result.affectedRows > 0) {
                res.setResponseJson(res, 200, '댓글 입력 성공');
            }
            await connetion.commit();
        } catch (err) {
            console.log(err);
            await connetion.rollback();
            res.setResponseJson(res, 500, { error: err.message });
        }

    }
}


export const insertItNews = { process, output };