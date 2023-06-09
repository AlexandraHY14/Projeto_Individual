var livroModel = require("../models/livroModel");

var sessoes = [];

// function testar(req, res) {
//     console.log("ENTRAMOS NA livroController");
//     res.json("ESTAMOS FUNCIONANDO!");
// }

function listar(req, res) {
    usuarioModel.listar()
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

function selectLivroCadastrado(req, res) {
    var nomeLivro = req.body.tituloServer;
    var nomeAutor = req.body.autorServer;
    var totalPag = req.body.totalPagServer;

    var dia = req.body.diaServer;
    var mes = req.body.mesServer;
    var ano = req.body.anoServer;


    if (titulo == undefined) {
        res.status(400).send("O titulo do livro está undefined!");
    } else if (autor == undefined) {
        res.status(400).send("O autor está undefined!");
    } else if (totalPag == undefined) {
        res.status(400).send("O total de Páginas está undefined!");
    } else if (dia == undefined) {
        res.status(400).send("O dia está undefined!");
    } else if (mes == undefined) {
        res.status(400).send("O mes está undefined!");
    } else if (ano == undefined) {
        res.status(400).send("O ano está undefined!");
    } else {
        
        usuarioModel.selectLivroCadastrado(titulo, autor, totalPag, ano, mes, dia)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);

                    } else if (resultado.length == 0) {
                        res.status(403).send("titulo inválido");

                    } else {
                        res.status(403).send("Mais de um idLivro com o mesmo nome e qtdTotalDePag!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro do livro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrarLivro(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var titulo = req.body.tituloServer;
    var autor = req.body.autorServer;
    var totalPag = req.body.totalPagServer;
    var dia = req.body.diaServer;
    var mes = req.body.mesServer;
    var ano = req.body.anoServer;

    // Faça as validações dos valores
    if (titulo == undefined) {
        res.status(400).send("O titulo do livro está undefined!");
    } else if (autor == undefined) {
        res.status(400).send("O autor está undefined!");
    } else if (totalPag == undefined) {
        res.status(400).send("O total de Páginas está undefined!");
    } else if (dia == undefined) {
        res.status(400).send("O dia está undefined!");
    } else if (mes == undefined) {
        res.status(400).send("O mes está undefined!");
    } else if (ano == undefined) {
        res.status(400).send("O ano está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        livroModel.cadastrarLivro(titulo, autor, totalPag, ano, mes, dia)
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
    selectLivroCadastrado,
    cadastrarLivro,
    listar,
    // testar
}