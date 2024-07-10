const {decodedPayload } = require('../utils/jwt');

const mainAuth = (req, res, next) => {
    console.log('안녕');
    console.log(req.cookies)
    const accessToken = req.cookies.accessToken;

    if(!accessToken){
        return res.status(401).send('Acces Denied');
    }
    try{
        const user = decodedPayload(accessToken);
        req.user = user;
        next();   
    }catch(err){
        console.log(err);
        res.status(400).send('Invalid Token');
    }
};

const auth = (req, res, next) =>{
    const {accessToken} = req.cookies.accessToken;
    if(accessToken !== undefined) {
        const user = decodedPayload(accessToken);
        req.user = user;
        next();
    } else {
        res.json('로그인 바랍니다');
    }
}

const unAuth = (req, res) =>{
    const {accessToken} = req.cookies;
    if(accessToken !== undefined){
        next();
    }else{
        res.send('오류');
    }
}


module.exports = {mainAuth, auth, unAuth}