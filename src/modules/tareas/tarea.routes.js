const express = require("express");
const router = express.Router();
const controller = require("./tarea.controller");

router.get("/", controller.listar);



module.exports = router;
