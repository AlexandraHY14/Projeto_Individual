var database = require("../database/config")

function listar(idUsuario, idLivro) {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", idUsuario, idLivro);
    var instrucao = `
    SELECT * FROM registro JOIN livro ON fkLivro = idLivro WHERE condicao <> 'f' AND fkUsuario = ${idUsuario} AND fkLivro = ${idLivro};
    `;
    // SELECT * FROM usuario join livro on fkUsuario = idUsuario; -- where idUsuario = 'ID_USUARIO'; (isso seria como em entrar logo)
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Esse autenticar checa se o livro foi registrado como iniciado antes de ser registrado como lendo ou finalizado - data inicial
function pegarId(idUsuario, idLivro) {
    console.log("ACESSEI O REGISTRO MODEL \n", idUsuario, idLivro)
    var instrucao =
        `SELECT * FROM registro JOIN livro ON fkLivro = idLivro WHERE condicao = 'i' AND fkUsuario = ${idUsuario} AND fkLivro = ${idLivro};

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function lendo(idUsuario) {
    console.log("ACESSEI O REGISTRO MODEL \n", idUsuario)
    var instrucao =
        `SELECT distinct idLivro, nome, dataInicial FROM registro JOIN livro ON fkLivro = idLivro WHERE condicao <> 'f' AND fkUsuario = ${idUsuario};

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function inserirRegistroI(idUsuario, idLivro, dia, mes, ano, diaSemana, totalPagLidasHoje, condicao, mesNumerico) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inserirRegistroI():", idUsuario, idLivro, dia, mes, ano, diaSemana, totalPagLidasHoje, condicao, mesNumerico);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO registro VALUES  (null, ${idUsuario}, ${idLivro}, ${dia}, '${mes}', ${ano}, '${diaSemana}', ${totalPagLidasHoje}, '${condicao}', '${dia}-${mesNumerico}-${ano}', null);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function inserirRegistroL(idUsuario, idLivro, dia, mes, ano, diaSemana, totalPagLidasHoje, condicao, dataInicial) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inserirRegistroL():", idUsuario, idLivro, dia, mes, ano, diaSemana, totalPagLidasHoje, condicao, dataInicial);
    var instrucao = `
        INSERT INTO registro VALUES  (null, ${idUsuario}, ${idLivro}, ${dia}, '${mes}', ${ano}, '${diaSemana}', ${totalPagLidasHoje}, '${condicao}', '${dataInicial}', null);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function inserirRegistroF(idUsuario, idLivro, dia, mes, ano, diaSemana, totalPagLidasHoje, condicao, dataInicial, mesNumerico) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function inserirRegistroF():", idUsuario, idLivro, dia, mes, ano, diaSemana, totalPagLidasHoje, condicao, dataInicial);

    var instrucao = `
        INSERT INTO registro VALUES  (null, ${idUsuario}, ${idLivro}, ${dia}, '${mes}', ${ano}, '${diaSemana}', ${totalPagLidasHoje}, '${condicao}', '${dataInicial}', '${dia}-${mesNumerico}-${ano}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function updateDataFinal(idUsuario, idLivro, dia, mesNumerico, ano) {
    var instrucao = ` UPDATE registro SET dataFinal = '${dia}-${mesNumerico}-${ano}' where condicao <> 'f' and fkUsuario = ${idUsuario} and fkLivro = ${idLivro};
    `;
  
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

  function updateCondicaoFinal(idUsuario, idLivro) {
    var instrucao = ` UPDATE registro SET condicao = 'f' where fkUsuario = ${idUsuario} AND fkLivro = ${idLivro} AND condicao <> 'f';
    `;
  
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }
module.exports = {
    lendo,
    inserirRegistroI,
    inserirRegistroL,
    inserirRegistroF,
    updateDataFinal,
    updateCondicaoFinal,
    pegarId,
    listar
};