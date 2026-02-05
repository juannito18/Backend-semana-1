const express = require("express");
const router = express.Router();


const {
    register,
    login,
    perfil
} = require("../controllers/authController");
const auth = require("../middlewares/auth");
router.post("/register",register);
router.post("/login",login);
router.get("/perfil",auth,perfil);
module.exports =router;  