function verifyAdminRole(req, res, next) {    
    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Acesso negado!" });
    }

    next();
}

module.exports = verifyAdminRole;