const authService = require("../services/authService");
async function register(req,res) {
    try {
        const usuario = await authService.register(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
}

async function login(req, res) {
    try {
        const  data = await authService.login(req.body);
        res.json(data)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

function perfil(req,res) {
    res.json({
        mensaje: "perfil",
        usuario: req.usuario
    });
}
module.exports = { register, login, perfil };