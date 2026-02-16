const authorize = (rolesPermitidos)=>{
    return (req, res, next)=>{
        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(406).json({
                error: "No tienes permiso para acceder a este recurso"
            });
        }
        next();
    };
};


module.exports = authorize;