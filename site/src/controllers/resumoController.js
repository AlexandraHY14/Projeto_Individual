var resumoModel = require("../models/resumoModel");

function testar(req, res) {
    console.log("ENTRAMOS NO resumoController");
    res.send("ENTRAMOS NO resumo CONTROLLER");
}

function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    resumoModel.listar(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os resumos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function selectIdRegistroF(req, res) {
    var idUsuario = req.params.idUsuario;
    var titulo = req.params.nomeLivro;
  
    resumoModel
      .selectIdRegistroF(idUsuario, titulo)
      .then(function (resultado) {
        // console.log(`\nResultados encontrados: ${resultado.length}`);
        // console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING
    
          if (resultado.length == 1) {
            console.log(resultado);
            res.json(resultado[0]);
          } else if (resultado.length == 0) {
            res.status(403).send("Nome do Livro INVÁLIDO");
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
              "\nHouve um erro ao selecionar o Livro! ERRO: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }

// ___________________________________________________________
function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    resumoModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os resumos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarA(req, res) {
    var idUsuario = req.params.idUsuario;

    resumoModel.listarA(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os resumos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    resumoModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar os resumos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    // var titulo = req.body.titulo;
    var resumo = req.body.resumo;
    var idRegistroF = req.params.idRegistroF;

    if (resumo == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idRegistroF == undefined) {
        res.status(403).send("O id do Registro está indefinido!");
    } else {
        resumoModel.publicar(resumo, idRegistroF)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var novaDescricao = req.body.descricao;
    var idresumo = req.params.idresumo;

    resumoModel.editar(novaDescricao, idresumo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var idresumo = req.params.idresumo;

    resumoModel.deletar(idresumo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    testar,
    listar,
    listarA,
    selectIdRegistroF,
    listarPorUsuario,
    pesquisarDescricao,
    publicar,
    editar,
    deletar
}