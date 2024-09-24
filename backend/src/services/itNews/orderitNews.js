import { query } from 'express';
import promisePool from '../../../config/db';
import setResponseJson from '../../utils/responseDto';

const output = {
    news: async (req, res) => {
        const connection = await promisePool.getConnection();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const offest = (page - 1) * limit;

        const sort = req.params.sort || 'latest';
        let orderBy;
        console.log(sort)
        if (sort === 'latest') {
            orderBy = 'ORDER BY news.created_date DESC';
        } else if (sort === 'views') {
            orderBy = 'ORDER BY view_cnt DESC';
        } else if (sort === 'popular') {
            orderBy = 'ORDER BY like_cnt DESC';
        }

        const sql = `
        SELECT news.*,
                IFNULL(SUM(view.view_cnt), 0) AS view_cnt,
                IFNULL(COUNT(likes.like_id), 0) AS like_cnt
                FROM TB_ITNEWS news 
                LEFT JOIN TB_ITNEWS_VIEW view ON news.itnews_id = view.itnews_id 
                LEFT JOIN TB_ITNEWS_LIKE likes ON news.itnews_id = likes.itnews_id WHERE news.del_yn = "N" GROUP BY news.itnews_id ${orderBy} LIMIT ?, ?`;
        try {
            await connection.beginTransaction();
            const [orderResult] = await connection.query(sql, [offest, limit]);
            await connection.commit();
            setResponseJson(res, 200, '아이티뉴스 리스트 조회 성공', orderResult)
        } catch (err) {
            console.log(err)
            await connection.rollback();
            setResponseJson(res, 500, '아이티뉴스 리스트 조회 실패', { error: err.message })
        }
    }
}

export const orderByItnews = { process, output };