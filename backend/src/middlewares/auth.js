import { decodedPayload, replaceAccessToken } from '../utils/jwt';

import { suspensionCheck } from '../utils/users';

const mainAuth = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    console.log(req.userId)
    if (!accessToken && !refreshToken) {
        return res.status(401).send('로그인 바랍니다');
    }
    try {
        if (accessToken) {
            const user = decodedPayload(accessToken);
            req.user = user;
            console.log(user)
            const userId = user.payload.userId;
            console.log(userId)
            try {
                const suspesded = await suspensionCheck(req, res, userId);
                console.log(suspesded)
                if (suspesded === true) {
                    return res.status(403).send('정지된 사용자입니다.');
                }
            } catch (err) {
                console.log(err)
                return res.status(500).send(err);
            }
            return next();
        } else {
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
            return next()
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

export { mainAuth, auth, unAuth };
