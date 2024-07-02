const getConnection = require('../../config/db');
const setResponseJson = require('../models/responseDto');

const output = {
    signup : (req,res) =>{
        res.send('회원가입');
    }
}

const process = {
    signup : (req,res) => {
        try{
            const sql = `INSERT 
            INTO TB_USER ( email, password, nickname, phone_num, created_date, mod_date ) 
            VALUES ( ?, ?, ?, ?, now(), now())`;

            const {email , password, nickname, phone_num} = req.body;
            const data = [email, password, nickname, phone_num];

            getConnection((err,connection) => {
                    if(err){
                        setResponseJson(res, 500, 'Database err', null);
                        console.log(err)
                    }
                    connection.query(sql, data, (err, result) =>{
                        connection.release();
                            if(err){
                                setResponseJson(res, 500, 'Database query err', null);
                                console.log(err)
                            }
                            setResponseJson(res, 200, 'successful',result);
                            console.log(result)
                        });
                })
    
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = {
    output,
    process
}