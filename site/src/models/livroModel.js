var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM livro;
    `;
    // SELECT * FROM usuario join livro on fkUsuario = idUsuario; -- where idUsuario = 'ID_USUARIO'; (isso seria como em entrar logo)
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function selectLivroCadastrado(nomeLivro, totalPag) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function selectLivroCadastrado(): ",titulo, autor, totalPag, ano, mes, dia)
    var instrucao = `
        SELECT * FROM livro WHERE nome = '${nomeLivro}' AND qtdTotalPag = ${totalPag} AND dataInicial = '${ano}-${mes}-${dia}'
        ;';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarLivro(titulo, autor, totalPag, ano, mes, dia) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarLivro():", titulo, autor, totalPag, ano, mes, dia);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Livro VALUES (null, '${titulo}', '${autor}', ${totalPag}, '${ano}-${mes}-${dia}', null);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    selectLivroCadastrado,
    cadastrarLivro,
    listar,
};