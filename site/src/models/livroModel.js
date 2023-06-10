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

function autenticar(titulo) {
    console.log("ACESSEI O LIVRO MODEL \n", titulo)
    var instrucao =
        `SELECT * FROM livro WHERE nome = '${titulo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function lendo(Usuario) {
    console.log("ACESSEI O LIVRO MODEL \n", Usuario)
    var instrucao =
        `SELECT distinct(idLivro), nome FROM registro JOIN livro ON fkLivro = idLivro WHERE condicao <> 'f' AND fkUsuario = ${Usuario};

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarLivro(titulo, autor, totalPag) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarLivro():", titulo, autor, totalPag);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Livro VALUES (null, '${titulo}', '${autor}', ${totalPag});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    lendo,
    autenticar,
    cadastrarLivro,
    listar,
};