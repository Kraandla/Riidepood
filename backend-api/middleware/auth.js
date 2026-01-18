function auth(req, res, next) {
    if(req.user?.UserID) {
        next();
    } else {
        res.sendStatus(401);
    }
}
module.exports = auth;