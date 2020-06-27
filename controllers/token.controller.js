var jwt = require('jsonwebtoken')

const firma = 'd3l1l4h';

exports.checkToken = async function (req, res, next) {
    if (!req.headers['token']) {
        return res.status(404).json({ error: 'Token not included in Header' });
    }
    const token = req.headers['token'];
    try {
        tokenVerified = jwt.verify(token, firma);
        req.userToken = tokenVerified;
        next();
    } catch (e) {
        return res.status(404).json({ status: 404, message: e.message });
    }
}


exports.isAdmin = async function (req, res, next) {
    if (req.userToken.admin === 1)
        next();
    else
        return res.status(401).json({ error: 'Unauthorized access' });
}