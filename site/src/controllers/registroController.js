var registroModel = require("../models/registroModel");

var sessoes = [];

// function testar(req, res) {
//     console.log("ENTRAMOS NA registroController");
//     res.json("ESTAMOS FUNCIONANDO!");
// }

function listar(req, res) {
  registroModel.listar()
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

function selectIL(req, res) {
  var idUsuario = req.params.usuario;
  
    registroModel.lendo(idUsuario)
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
// ---\\---
function selectRegistroInicial(req, res) {
  var idUsuario = req.params.idUsuario;
  var idLivro = req.params.idLivro;

  registroModel
    .pegarId(idUsuario, idLivro)
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
// ---\\---
function inserirRegistroI(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

  var idUsuario = req.body.idUsuarioServer;
  var idLivro = req.body.idLivroServer;

  var dia = req.body.diaServer;
  var mes = req.body.mesServer;
  var ano = req.body.anoServer;

  var diaSemana = req.body.diaSemanaServer;
  var totalPagLidasHoje = req.body.pagHojeServer;
  var condicao = req.body.condicaoServer;

  var mesNumerico = req.body.mesNumericoServer;


  // Faça as validações dos valores
  if (idUsuario == undefined) {
    res.status(400).send("O idUsuario para o registro Inicial está undefined!");
  } else if (idLivro == undefined) {
    res.status(400).send("O idLivro para o registro Inicial está undefined!");
  } else if (dia == undefined) {
    res.status(400).send("O dia para o registro Inicial está undefined!");
  } else if (mes == undefined) {
    res.status(400).send("O mes para o registro Inicial está undefined!");
  } else if (ano == undefined) {
    res.status(400).send("O ano para o registro Inicial está undefined!");
  } else if (diaSemana == undefined) {
    res.status(400).send("O dia da semana para o registro Inicial está undefined!");
  } else if (totalPagLidasHoje == undefined) {
    res.status(400).send("O total de páginas lidas hoje para o registro Inicial está undefined!");
  } else if (condicao == undefined) {
    res.status(400).send("A condição para o registro Inicial está undefined!");
  } else if (mesNumerico == undefined) {
    res.status(400).send("O mes em númerico para o registro Inicial está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    registroModel.inserirRegistroI(idUsuario, idLivro, dia, mes, ano, diaSemana, totalPagLidasHoje, condicao, mesNumerico)
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

function inserirRegistroL(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

  var idUsuario = req.body.idUsuarioServer;
  var idLivro = req.body.idLivroServer;

  var dia = req.body.diaServer;
  var mes = req.body.mesServer;
  var ano = req.body.anoServer;

  var diaSemana = req.body.diaSemanaServer;
  var totalPagLidasHoje = req.body.pagHojeServer;
  var condicao = req.body.condicaoServer;

  var dataInicial = req.body.dataInicialServer;


  // Faça as validações dos valores
  if (idUsuario == undefined) {
    res.status(400).send("O idUsuario para o registro Lendo está undefined!");
  } else if (idLivro == undefined) {
    res.status(400).send("O idLivro para o registro Lendo está undefined!");
  } else if (dia == undefined) {
    res.status(400).send("O dia para o registro Lendo está undefined!");
  } else if (mes == undefined) {
    res.status(400).send("O mes para o registro Lendo está undefined!");
  } else if (ano == undefined) {
    res.status(400).send("O ano para o registro Lendo está undefined!");
  } else if (diaSemana == undefined) {
    res.status(400).send("O dia da semana para o registro Lendo está undefined!");
  } else if (totalPagLidasHoje == undefined) {
    res.status(400).send("O total de páginas lidas hoje para o registro Lendo está undefined!");
  } else if (condicao == undefined) {
    res.status(400).send("A condição para o registro Lendo está undefined!");
  } else if (dataInicial == undefined) {
    res.status(400).send("A dataInicial está undefined para o Registro Lendo");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    registroModel.inserirRegistroL(idUsuario, idLivro, dia, mes, ano, diaSemana, totalPagLidasHoje, condicao, dataInicial)
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

// ________________________________
function inserirRegistroF(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

  var idUsuario = req.body.idUsuarioServer;
  var idLivro = req.body.idLivroServer;

  var dia = req.body.diaServer;
  var mes = req.body.mesServer;
  var ano = req.body.anoServer;

  var diaSemana = req.body.diaSemanaServer;
  var totalPagLidasHoje = req.body.pagHojeServer;
  var condicao = req.body.condicaoServer;

  var dataInicial = req.body.dataInicialServer;
  var mesNumerico = req.body.mesNumericoServer;


  // Faça as validações dos valores
  if (idUsuario == undefined) {
    res.status(400).send("O idUsuario para o registro Finalizado está undefined!");
  } else if (idLivro == undefined) {
    res.status(400).send("O idLivro para o registro Finalizado está undefined!");
  } else if (dia == undefined) {
    res.status(400).send("O dia para o registro Finalizado está undefined!");
  } else if (mes == undefined) {
    res.status(400).send("O mes para o registro Finalizado está undefined!");
  } else if (ano == undefined) {
    res.status(400).send("O ano para o registro Finalizado está undefined!");
  } else if (diaSemana == undefined) {
    res.status(400).send("O dia da semana para o Finalizado Lendo está undefined!");
  } else if (totalPagLidasHoje == undefined) {
    res.status(400).send("O total de páginas lidas hoje para o registro Finalizado está undefined!");
  } else if (condicao == undefined) {
    res.status(400).send("A condição para o registro Finalizado está undefined!");
  } else if (dataInicial == undefined) {
    res.status(400).send("A dataInicial está undefined para o Registro Finalizado");
  } else if (mesNumerico == undefined) {
    res.status(400).send("O mes em númerico para o registro Finalizado está undefined!");
  } else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    registroModel.inserirRegistroF(idUsuario, idLivro, dia, mes, ano, diaSemana, totalPagLidasHoje, condicao, dataInicial, mesNumerico)
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


function updateDataFinal(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var idUsuario = req.params.idUsuario;
  var idLivro = req.params.idLivro;

  var dia = req.body.diaServer;
  var mesNumerico = req.body.mesNumericoServer;
  var ano = req.body.anoServer;

  // Faça as validações dos valores
  if (idUsuario == undefined) {
    res.status(400).send("O idUsuario para o Update registro Finalizado está undefined!");
  } else if (idLivro == undefined) {
    res.status(400).send("O idLivro para o Update registro Finalizado está undefined!");
  } else if (dia == undefined) {
    res.status(400).send("O dia para o Update registro Finalizado está undefined!");
  } else if (mesNumerico == undefined) {
    res.status(400).send("O mes para o Update registro Finalizado está undefined!");
  } else if (ano == undefined) {
    res.status(400).send("O ano para o Update registro Finalizado está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo registroModel.js
    registroModel
      .updateDataFinal(
        idUsuario, idLivro, dia, mesNumerico, ano
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o Update do Registro datafinal! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function updateCondicaoFinal(req, res) {
  
  var idUsuario = req.params.idUsuario;
  var idLivro = req.params.idLivro;

  // Faça as validações dos valores
  if (idUsuario == undefined) {
    res.status(400).send("O idUsuario para o Update condicão = 'f' está undefined!");
  } else if (idLivro == undefined) {
    res.status(400).send("O idLivro para o Update condicão = 'f' está undefined!");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo registroModel.js
    registroModel
      .updateCondicaoFinal(
        idUsuario, idLivro
      )
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o Update do Registro datafinal! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}
module.exports = {
  selectIL,
  selectRegistroInicial,
  inserirRegistroI,
  inserirRegistroL,
  inserirRegistroF,
  updateDataFinal,
  updateCondicaoFinal,
  listar
  // testar
}