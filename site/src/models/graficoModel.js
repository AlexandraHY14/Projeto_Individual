var database = require("../database/config")

function listar(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select diaSemana, round(avg(qtdPagDia),2) as mediaPags from registro as reg
	join usuario as u on reg.fkUsuario = u.idUsuario
	where u.idUsuario = ${idUsuario}
    group by diaSemana;
    `;
    // SELECT * FROM usuario join livro on fkUsuario = idUsuario; -- where idUsuario = 'ID_USUARIO'; (isso seria como em entrar logo)
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegarSomaPag(idUsuario) {
    console.log("ACESSEI O LIVRO MODEL \n", idUsuario)
    var instrucao =
        `SELECT sum(qtdPagDia) as total_lido FROM registro where fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    pegarSomaPag,
    listar
};