const { decodePayload } = require('../utils/jwt');

const mainAuth = (req, res, next) => {
  const { accessToekn } = req.cookies;
  if (accessToekn !== undefined) {
    const user = decodePayload(accessToekn);
    req.user;
  }
  next();
};

const auth = (req, res, next) => {
  const { accessToekn } = req.cookies;
  if (accessToekn !== undefined) {
    const user = decodePayload(accessToekn);
    req.user = user;
    next();
  } else {
    res.json('로그인 바랍니다');
  }
};

const unAuth = (req, res) => {
  const { accessToekn } = req.cookies;
  if (accessToekn !== undefined) {
    next();
  } else {
    res.send('오류');
  }
};

module.exports = { mainAuth, auth, unAuth };
