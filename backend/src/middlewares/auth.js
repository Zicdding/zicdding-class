const {decodedPayload, replaceAccessToken } = require('../utils/jwt');

const mainAuth = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    console.log(accessToken)
    if (!accessToken && !refreshToken) {
        return res.status(401).send('Access Denied');
    }
    try {
        if (accessToken) {
            const user = decodedPayload(accessToken);
            req.user = user;
            return next();
        }
    } catch (err) {
        if (!refreshToken) {
            return res.status(401).send('Access Denied');
        }

        try {
            const newAccessToken = await replaceAccessToken(refreshToken);
            const updatedRefreshToken = await updateRefreshToken(refreshToken);

            res.cookie('accessToken', newAccessToken, { httpOnly: true });
            res.cookie('refreshToken', updatedRefreshToken, { httpOnly: true });

            req.user = decodedPayload(newAccessToken);
            return next();
        } catch (err) {
            return res.status(401).send('Invalid Token');
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
        return next();
    } else {
        return res.status(400).send('오류');
    }
};

module.exports = { mainAuth, auth, unAuth };