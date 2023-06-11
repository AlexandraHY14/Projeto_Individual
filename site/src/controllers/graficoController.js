var graficoModel = require("../models/graficoModel");

var sessoes = [];

// function testar(req, res) {
//     console.log("ENTRAMOS NA graficoController");
//     res.json("ESTAMOS FUNCIONANDO!");
// }

function listar(req, res) {
    graficoModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);

            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pegarSomaPag(req, res) {
    var idUsuario = req.params.idUsuario;
  
    graficoModel
      .pegarSomaPag(idUsuario)
      .then(function (resultado) {
        // console.log(`\nResultados encontrados: ${resultado.length}`);
        // console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING
  
        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Nome do grafico INVÁLIDO");
        } else {
          res.status(403).send("Mais de um grafico com o mesmo NOME");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
            "\nHouve um erro ao selecionar o grafico! ERRO: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }



module.exports = {  
  pegarSomaPag,
    listar
}