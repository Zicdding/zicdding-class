const {decodePlayload } = require('../utils/jwt');

const mainAuth = (req,res,next) => {
    const {accessToekn} = req.cookies;
    if(accessToekn !== undefined) {
        const user = decodePlayload(accessToekn);
        req.user;
    }
    next()
}

const auth = (req, res, next) =>{
    const {accessToekn} = req.cookies;
    if(accessToekn !== undefined) {
        const user = decodePlayload(accessToekn);
        req.user = user;
        next();
    } else {
        res.json('로그인 바랍니다');
    }
}



module.exports = {mainAuth, auth}