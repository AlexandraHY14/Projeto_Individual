var livroModel = require("../models/livroModel");

var sessoes = [];

// function testar(req, res) {
//     console.log("ENTRAMOS NA livroController");
//     res.json("ESTAMOS FUNCIONANDO!");
// }

function listar(req, res) {
    livroModel.listar()
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

// function autenticar(req, res) {
//     var titulo = req.params.idLivro;
  
//     livroModel
//     .autenticar(titulo)
//     .then(function (resultado) {
//       // console.log(`\nResultados encontrados: ${resultado.length}`);
//       // console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING

//       if (resultado.length == 1) {
//         console.log(resultado);
//         res.json(resultado[0]);
//       } else if (resultado.length == 0) {
//         res.status(403).send("Nome do Livro INVÁLIDO");
//       } else {
//         res.status(403).send("Mais de um LIVRO com o mesmo NOME");
//       }
//     })
//     .catch(function (erro) {
//       console.log(erro);
//       console.log(
//         "\nHouve um erro ao selecionar o Livro! ERRO: ",
//         erro.sqlMessage
//       );
//       res.status(500).json(erro.sqlMessage);
//     });
// }
function selectLivro(req, res) {
    var titulo = req.params.nome;
  
    livroModel
      .autenticar(titulo)
      .then(function (resultado) {
        // console.log(`\nResultados encontrados: ${resultado.length}`);
        // console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING
  
        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Nome do Livro INVÁLIDO");
        } else {
          res.status(403).send("Mais de um LIVRO com o mesmo NOME");
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

// ---\\---
function selectIniciadoLendo(req, res) {
    var Usuario = req.params.idUsuario;
  
    livroModel
      .lendo(Usuario)
      .then(function (resultado) {
        // console.log(`\nResultados encontrados: ${resultado.length}`);
        // console.log(`Resultados: ${JSON.stringify(resultado)}`); //TRANSFORMA JSON EM STRING
  

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

function cadastrarLivro(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var titulo = req.body.tituloServer;
    var autor = req.body.autorServer;
    var totalPag = req.body.totalPagServer;

    // Faça as validações dos valores
    if (titulo == undefined) {
        res.status(400).send("O titulo do livro está undefined!");
    } else if (autor == undefined) {
        res.status(400).send("O autor está undefined!");
    } else if (totalPag == undefined) {
        res.status(400).send("O total de Páginas está undefined!");
    } else{
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        livroModel.cadastrarLivro(titulo, autor, totalPag)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    selectIniciadoLendo,
    selectLivro,
    cadastrarLivro,
    listar,
    // testar
}