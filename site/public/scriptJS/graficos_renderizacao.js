
graficoPizza();
selectMesesRegistrados();
selectAnosRegistrados();

function graficoPizza() {
    var idUsuario = sessionStorage.ID_USUARIO;


    fetch(`/graficos/listar/${idUsuario}`).then(function (response) {
        if (response.ok) {
            // alert(response.status);
            if (response.status == 204) {

                // var feed = document.getElementById("registrando");
                // var mensagem = document.createElement("scroll-page");

                mensagem.innerHTML = "0." //SE NÂO APARECER NADA, MUDAR AQUI
                feed.appendChild(mensagem);

                throw "Nenhum resultado encontrado!!";
            }

            response.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                // pontos = resposta;

                var feed = document.getElementById("registrando");
                feed.innerHTML = "";

                graficoSemana.data.datasets[0].data = [];
                var somaDasMedias = 0;

                for (let i = 0; i < resposta.length; i++) {
                    var mediaPaginas = resposta[i].mediaPags;
                    somaDasMedias = Number(somaDasMedias) + Number(mediaPaginas);

                }
                // alert(somaDasMedias.toFixed(2)) 

                for (let i = 0; i < resposta.length; i++) {
                    let mediaIndividualPags = resposta[i].mediaPags;
                    let porcentagem = ((mediaIndividualPags / somaDasMedias) * 100).toFixed(2);
                    // alert(porcentagem.toFixed(2));

                    graficoSemana.data.datasets[0].data.push(porcentagem);

                    // var publicacao = resposta[i];

                    // var registro = document.createElement("scroll-page");

                    // registro.innerHTML = `+_+ Título: ${publicacao.nome} || Data: ${publicacao.dia}/${publicacao.mes}/${publicacao.ano} || ${publicacao.diaSemana} || ${publicacao.qtdPagDia} página(s) lida(s) (de ${publicacao.qtdTotalPag} pág(s));`;

                    // feed.appendChild(registro);
                }
                graficoSemana.update();
            });
        } else {
            throw ("Houve um erro na API")
        }
    }).catch(function (erro) {
        console.error(erro);
    });
}


// selectMesesRegistrados();
function selectMesesRegistrados() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/graficos/listarM/${idUsuario}`).then(function (response) {
        if (response.ok) {
            // alert(response.status);
            if (response.status == 204) {
                var feed = document.getElementById("todosOsMesses");
                var mensagem = document.createElement("option");
                // var feed02 = document.getElementById("todosOsAutores");
                // var mensagem02 = document.createElement("option");
                mensagem.innerHTML = "Nenhum resultado encontrado." //SE NÂO APARECER NADA, MUDAR AQUI
                feed.appendChild(mensagem);
                // mensagem02.innerHTML = "Nenhum resultado encontrado." //SE NÂO APARECER NADA, MUDAR AQUI
                // feed02.appendChild(mensagem02);
                throw "Nenhum resultado encontrado!!";
            }

            response.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("todosOsMesses");
                feed.innerHTML = "";

                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var opcao = document.createElement("option");

                    opcao.innerHTML = `${publicacao.mes}`;

                    feed.appendChild(opcao);
                }
            });
        } else {
            throw ("Houve um erro na API")
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function selectAnosRegistrados() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/graficos/listarA/${idUsuario}`).then(function (response) {
        if (response.ok) {
            // alert(response.status);
            if (response.status == 204) {
                var feed = document.getElementById("todosOsAnos");
                var mensagem = document.createElement("option");
                // var feed02 = document.getElementById("todosOsAutores");
                // var mensagem02 = document.createElement("option");
                mensagem.innerHTML = "Nenhum resultado encontrado." //SE NÂO APARECER NADA, MUDAR AQUI
                feed.appendChild(mensagem);
                // mensagem02.innerHTML = "Nenhum resultado encontrado." //SE NÂO APARECER NADA, MUDAR AQUI
                // feed02.appendChild(mensagem02);
                throw "Nenhum resultado encontrado!!";
            }

            response.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("todosOsAnos");
                feed.innerHTML = "";

                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var opcao = document.createElement("option");

                    opcao.innerHTML = `${publicacao.ano}`;

                    feed.appendChild(opcao);
                }
            });
        } else {
            throw ("Houve um erro na API")
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}