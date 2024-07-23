const getConnection = require('../../config/db');
const { connect } = require('../api');

exports.findUser = (data, cd) => {
  const sql = 'SELECT ';
};

exports.createUser = (data, cb) => {
  const sql = `INSERT 
        INTO TB_USER (user_id, email, passwrod, nickname, phone_num, role_type, suspension_yn, del_yn, created_date, mod_user, mod_date ) 
        VALUES (?, ?, ?, ?, ?, '1', ?, 'N', now(), ?,now())`;

  const values = [
    data.user_id,
    data.email,
    data.password,
    data.nickname,
    data.phone_num,
    data.suspesion_yn,
    data.mod_user,
  ];

  pool.getConnection((err, connection) => {
    if (err) {
      cb(err);
      return;
    }
    connection.query(sql, values, (err, result) => {
      connection.release();
      if (err) {
        cb(err);
      }
      cb(null, result);
    });
  });
};

exports.singIn = (data, cb) => {};

exports.getUser = (user_id, cb) => {
  const sql = `SELECT * FROM TB_USER where user_id = '${user_id} limit 1'`;
  getConnection.query(sql, (err, rows) => {
    if (err) throw err;
    cb(rows);
  });
};
