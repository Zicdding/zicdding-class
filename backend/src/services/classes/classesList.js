const classesList = async (req, res) => {
    const userId = req.user?.payload?.userId ?? '';
    const connection = await promisePool.getConnection();
    const { classType, searchType, searchWord, sort } = req.query;
    
    try {
        let classSql = `
            SELECT
                cs.class_id AS classId
                , cs.class_title AS classTitle
                , cs.recruitment_yn AS recruitmentYn
                , cs.start_date AS startDate
                , cs.end_date AS endDate
                , cd1.description AS classHow
                , cd2.description AS classType
                , cs.est_confirm_yn AS estConfirmYn
                , cs.est_month AS estMonth
                , cs.headcount
                , cd3.description AS contectType
                , cs.contect_url AS contectUrl
                , cs.content
                , (SELECT COUNT(*) FROM TB_CLASS_VIEW cv WHERE cv.class_id = cs.class_id) AS viewCnt
                , (SELECT COUNT(*) FROM TB_LIKE l WHERE l.class_id = cs.class_id) AS likeCnt
                , (SELECT COUNT(*) FROM TB_COMMENT cm WHERE cm.class_id = cs.class_id AND cm.del_yn = 'N') AS commentCnt
                , IF(ml.like_id IS NOT NULL, 1, 0) AS myLike
            FROM TB_CLASS cs
                LEFT JOIN TB_USER us ON us.user_id = cs.user_id
                LEFT JOIN TB_CODE cd1 ON cd1.code_group_id = 2 AND cd1.code = cs.class_how
                LEFT JOIN TB_CODE cd2 ON cd2.code_group_id = 1 AND cd2.code = cs.class_type
                LEFT JOIN TB_CODE cd3 ON cd3.code_group_id = 3 AND cd3.code = cs.contect_type
                LEFT JOIN TB_LIKE ml ON ml.class_id = cs.class_id AND ml.user_id = ?
            WHERE us.del_yn = 'N' AND us.suspension_yn = 'N'
        `;

        let params = [userId];

        // 클래스 타입 조건
        if (classType) {
            classSql += ' AND cs.class_type = ?';
            params.push(classType);
        }

        // 검색 조건
        if (searchType && searchWord) {
            if (searchType === 'title') {
                classSql += ` AND cs.class_title LIKE '&?&'`;
            } else if (searchType === 'technology') {
                classSql +=  `
                    AND cs.class_id IN (
                        SELECT ct.class_id FROM TB_CLASS_TECHNOLOGY ct 
                            LEFT JOIN TB_TECHNOLOGY t ON t.technology_id = ct.technology_id AND t.del_yn = 'N' 
                        WHERE MATCH(t.name) AGAINST(?)
                    )
                `;
            } else if (searchType === 'position') {
                classSql +=  `
                    AND ? IN (SELECT po.position FROM TB_POSITION po WHERE po.class_id = cs.class_id AND po.del_yn = 'N')
                `;
            }
            params.push(`%${searchWord}%`);
        }

        // 정렬
        if (sort === 'latest') {
            classSql += ' ORDER BY cs.mod_date DESC';
        } else if (sort === 'popular') {
            classSql += ' ORDER BY likeCnt DESC, cs.mod_date DESC';
        } else if (sort === 'views') {
            classSql += ' ORDER BY viewCnt DESC, cs.mod_date DESC';
        }

        const [classRows] = await connection.query(classSql, params);

        
        for (let i = 0; i < classRows.length; i++) {
            // 포지션 정보 가져오기
            const positionSql = `
                SELECT po.position FROM TB_POSITION po WHERE po.class_id = ? AND po.del_yn = 'N'
            `;
            const [positionRows] = await connection.query(positionSql, [classRows[i].classId]);
            classRows[i].position = positionRows.map(row => row.position);

            // 기술 정보 가져오기
            const technologySql = `
                SELECT
                    t.name
                    , CONCAT(f.path, '/', f.changed_name, '.', f.ext) AS imgUrl
                FROM TB_CLASS_TECHNOLOGY ct 
                    LEFT JOIN TB_TECHNOLOGY t ON t.technology_id = ct.technology_id
                    LEFT JOIN TB_FILE f ON f.target_id = ct.technology_id AND f.table_name = 'TB_TECHNOLOGY' AND f.del_yn = 'N'
                WHERE ct.class_id = ?
                AND t.del_yn = 'N'
            `;
            const [technologyRows] = await connection.query(technologySql, [classRows[i].classId]);
            classRows[i].technology = technologyRows;
        }

        const result = {classes : classRows};
        setResponseJson(res, 200, '클래스 리스트 조회 성공', result);
        
    } catch (err) {
        console.error(err);
        setResponseJson(res, 400, '클래스 리스트 조회에 오류가 발생하였습니다.');
    } finally {
        if (connection) connection.release();
    }
};

export { classesList };