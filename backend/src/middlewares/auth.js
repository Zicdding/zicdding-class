import { decodedPayload, replaceAccessToken } from '../utils/jwt';

import { suspensionCheck } from '../utils/users';

import setResponseJson from '../utils/responseDto';
const mainAuth = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    console.log(req.userId)
    if (!accessToken && !refreshToken) {
        return setResponseJson(res, 401, '로그인 바랍니다');
    }
    try {
        if (accessToken) {
            const user = decodedPayload(accessToken);
            req.user = user;
            console.log(user)
            const userId = user.userId;
            console.log("디코딩" + userId)
            try {
                const suspesded = await suspensionCheck(req, res, userId);
                console.log(suspesded)
                if (suspesded === true) {
                    setResponseJson(res, 403, '정지된 사용자입니다.');
                }
            } catch (err) {
                console.log(err)
                return setResponseJson(res, 500, { error: err.message })
            }
            return next();
        } else {
            return setResponseJson(res, 401, '유효하지 않은 토큰');
        }
    } catch (err) {
        if (!refreshToken) {
            return setResponseJson(res, 401, '로그인 바랍니다');
        }
        try {
            const newAccessToken = await replaceAccessToken(refreshToken);
            const updatedRefreshToken = await updatedRefreshToken(refreshToken);

            res.cookie('accessToken', newAccessToken, { httpOnly: true });
            res.cookie('refreshToken', updatedRefreshToken, { httpOnly: true });

            req.user = decodedPayload(newAccessToken);
            return next()
        } catch (err) {
            return setResponseJson(res, 401, '유효하지 않은 토큰');
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
            return setResponseJson(res, 401, '유효하지 않은 토큰');
        }
    } else {
        return setResponseJson(res, 401, '로그인 바랍니다.');
    }
};

const unAuth = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
        next();
    } else {
        next();
    }
};

export { mainAuth, auth, unAuth };
