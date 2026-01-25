function adminAuth(req, res, next) {
    if(req.user?.UserID && req.user?.IsAdmin === true) {
        next();
    } else {
        res.status(403).send({error: "Admin access required."});
    }
}

module.exports = adminAuth;
