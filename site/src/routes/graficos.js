var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

// router.get("/", function (req, res) {
//     graficoController.testar(req, res);
// });

router.get("/listar/:idUsuario", function (req, res) {
    graficoController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de graficoController.js
router.get("/pegarSomaPag/:idUsuario", function (req, res) {
    graficoController.pegarSomaPag(req, res);
});

// router.post("/autenticar", function (req, res) {
//     graficoController.entrar(req, res);
// });


module.exports = router;