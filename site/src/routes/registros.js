var express = require("express");
var router = express.Router();

var registroController = require("../controllers/registroController");

// router.get("/", function (req, res) {
//     registroController.testar(req, res);
// });

router.get("/listar", function (req, res) {
    registroController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de registroController.js
router.post("/inserirRegistroI", function (req, res) {
    registroController.inserirRegistroI(req, res);
});

router.post("/inserirRegistroL", function (req, res) {
    registroController.inserirRegistroL(req, res);
});

router.post("/inserirRegistroF", function (req, res) {
    registroController.inserirRegistroF(req, res);
});

router.put("/updateDataFinal/:idUsuario/:idLivro", function (req, res) {
    registroController.updateDataFinal(req, res);
});
router.put("/updateCondicaoFinal/:idUsuario/:idLivro", function (req, res) {
    registroController.updateCondicaoFinal(req, res);
});

router.get("/pegarId/:idUsuario/:idLivro", function (req, res) {
    registroController.selectRegistroInicial(req, res);
});

router.get("/lendo/:usuario", function (req, res) {
    registroController.selectIL(req, res);
});

// router.post("/autenticar", function (req, res) {
//     registroController.entrar(req, res);
// });


module.exports = router;