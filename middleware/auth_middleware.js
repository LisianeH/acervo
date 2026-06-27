const tokenService = require("../service/token_service")

function verifyAcesso(req, res, next) {
    const authHeader = req.get("Authorization");

    if(!authHeader) {
        return res.status(401).json({
            id:401, msg:"Acesso inválido!"
        });        
    }

    try {
        const parts = authHeader.split(" ");
        const token = parts.length === 2 ? parts[1] : authHeader;
        const data = tokenService.validateToken(token);
        console.log("Payload do Token", data);
        req.user = data;
        return next();
    } catch (err) {
        return res.status(401).json({
            id:401, msg:"Acesso inválido!"
        });        
    }
}

module.exports = {
    verifyAcesso
}