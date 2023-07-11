var express = require("express");
var router = express.Router();

var resumoController = require("../controllers/resumoController");

router.get("/", function (req, res) {
    resumoController.testar(req, res);
});

// router.get("/listar/:idUsuario", function (req, res) {
//     resumoController.listar(req, res);
// });

router.get("/selecionar/:idUsuario/:nomeLivro", function (req, res) {
    resumoController.selectIdRegistroF(req, res);
});

router.get("/listarA/:idUsuario", function (req, res) {
    resumoController.listarA(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    resumoController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    resumoController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idRegistroF", function (req, res) {
    resumoController.publicar(req, res);
});

router.put("/editar/:idresumo", function (req, res) {
    resumoController.editar(req, res);
});

router.delete("/deletar/:idresumo", function (req, res) {
    resumoController.deletar(req, res);
});

module.exports = router;