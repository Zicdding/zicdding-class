const {decodedPayload, replaceAccessToken } = require('../utils/jwt');
const suspensionCheck = require('../utils/users'); 

const mainAuth = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    console.log(accessToken)
    if (!accessToken && !refreshToken) {
        return res.status(401).send('로그인 바랍니다');
    }
    try {
        if (accessToken) {
            const user = decodedPayload(accessToken);
            req.user = user;
            const userId = user.userId;
            try{
                /*
                const suspesded = await suspensionCheck(userId);
                if(suspesded){
                    return res.status(403).send('정지된 사용자입니다.');
                } */           
                return next();
            }catch(err){
                console.log(err)
                return res.status(500).send(err);
            }

        }else{
            return res.status(401).send('유효하지 않은 토큰');
        }
    } catch (err) {
        if (!refreshToken) {
            return res.status(401).send('로그인 바랍니다.');
        }
        try {
            const newAccessToken = await replaceAccessToken(refreshToken);
            const updatedRefreshToken = await updatedRefreshToken(refreshToken);

            res.cookie('accessToken', newAccessToken, { httpOnly: true });
            res.cookie('refreshToken', updatedRefreshToken, { httpOnly: true });

            req.user = decodedPayload(newAccessToken);
            return next();
        } catch (err) {
            return res.status(401).send('유효하지 않은 토큰');
        }
    }
};

const auth = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (accessToken !== undefined) {
        try {
            const user = decodedPayload(accessToken);
            req.user = user;
            return next();
        } catch (err) {
            return res.status(401).send('Invalid Token');
        }
    } else {
        res.status(401).send('로그인 바랍니다');
    }
};

const unAuth = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(200).send('로그인 해주세요')
    } else {
        next();
    }
};

module.exports = { mainAuth, auth, unAuth };