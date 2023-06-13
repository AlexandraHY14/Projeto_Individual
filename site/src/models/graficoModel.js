var database = require("../database/config")

function listar(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
    SELECT distinct diaSemana , round(avg(qtdPagDia),2) as mediaPags,
case when diaSemana = 'Segunda' then '1'
     when diaSemana = 'Terça' then '2'
     when diaSemana = 'Quarta' then '3'
     when diaSemana = 'Quinta' then '4'
     when diaSemana = 'Sexta' then '5'
     when diaSemana = 'Fim de Semana' then '6'
     
     end as diasOrdenados
 FROM registro where fkUsuario = ${idUsuario} group by diaSemana, diasOrdenados order by diasOrdenados;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarB(idUsuario, campoMes, campoAno) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()", idUsuario, campoMes, campoAno);

    var instrucao = `
    SELECT distinct diaSemana , round(avg(qtdPagDia),2) as mediaPags, ano, mes,
case when diaSemana = 'Segunda' then '1'
     when diaSemana = 'Terça' then '2'
     when diaSemana = 'Quarta' then '3'
     when diaSemana = 'Quinta' then '4'
     when diaSemana = 'Sexta' then '5'
     when diaSemana = 'Fim de Semana' then '6'
     
     end as diasOrdenados
 FROM registro where fkUsuario = ${idUsuario}  and mes like '${campoMes}' and ano = ${campoAno} group by diaSemana, diasOrdenados, ano, mes order by diasOrdenados;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarM(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
    SELECT distinct mes FROM registro WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarA(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
    SELECT distinct ano FROM registro WHERE fkUsuario = ${idUsuario};
    `;

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
    listar,
    listarM,
    listarA,
    listarB
};