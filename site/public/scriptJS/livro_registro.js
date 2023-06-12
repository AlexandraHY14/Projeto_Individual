selectID_REGISTROIniciado();

selectLivrosExistentes();
selectRegistrosNAOfinalizados();

selectLendo();



function InserirDados() {
    // var nomeLivro = ipt_titulo.value;
    // var nomeAutor = ipt_autor.value;
    // var totalPaginas = ipt_totalPag.value;
    // var dia = ipt_dia.value;
    // var mes = messesR.value;
    // var ano = ipt_ano.value;
    // var totalPagLidasHoje = ipt_lidas.value;
    // var diaSemana = diasR.value;

    var condicao = cond.value;

    var continuar = true;

    // Iniciado 1º
    if (condicao == "Iniciado") {
        condição = true;
        selectLendo();
        selectID_REGISTROIniciado();
        selectLivroCadastrado();
        // Selecionar no gegistro se possui uma condição 'i', caso possua, não deixar iniciar novamente, e caso não pussua, não deixar inserir como lendo, antes de iniciar

        // if (sessionStorage.ID_REGISTRO_I != null) {
        //     continuar = false;

        //     alert("Esse livro já foi iniciado");
        // }else{
        //     continuar = true;
        // }


        if (continuar == true) {
            if (sessionStorage.ID_LIVRO == null || sessionStorage.ID_LIVRO == undefined) {
                alert(`${nomeLivro}, ${nomeAutor} , ${totalPaginas}`)
                insertTabelaLivro();
                // selectLendo();
                // selectLivroCadastrado()

            }else
            if (sessionStorage.ID_LENDO != null || sessionStorage.ID_LIVRO != null) {
                alert("A")
                insertTabelaRegistroI();
            }
            
        }
        
    }

    // Lendo 2º
    if (condicao == "Lendo") {
        
        condição = true;
        
        // Se o idRegistro for = null, é porque não possui uma condição 'i', caso possua, não deixar iniciar novamente, e caso não pussua, não deixar inserir como lendo, antes de iniciar.
        selectLendo();
        selectID_REGISTROIniciado();
        selectLivroCadastrado();
       
        if (sessionStorage.ID_LIVRO != sessionStorage.ID_LENDO) {
            alert(`O titulo do livro que está tentando registrar não corresponde ao livro que estava lendo. Precisa terminar concluir o livro em andamento para iniciar outro :) - O livro não concluido é ${sessionStorage.TITULO}`)
            continuar = false;
        }
        if (sessionStorage.ID_REGISTRO_I == null || sessionStorage.ID_LENDO == undefined) {
            alert("Esse livro não foi iniciado");
            continuar = false;
        }
        // selectID_REGISTROIniciado();

        if (continuar == true) {
            insertTabelaRegistroL();

            // Utilizar idUsuario e idLlivro na condição lendo para adicionar a data inicial
            // X Fazer update no registro inserido para colocar data inicial - A data Inicial está sendo inserida junto com os outros dados, pois foi alocada em um session storage chamado DATA_INICIAL e passado pela função insertTabelaRegistroL(); - portanto não precia de update
        }

    }
    // Finalizado 3º
    if (condicao == "Finalizado") {
        condição = true;
        selectLendo();
        selectID_REGISTROIniciado();
        selectLivroCadastrado();

        // selectLendo();
        if (sessionStorage.ID_LIVRO != sessionStorage.ID_LENDO) {
            alert(`O titulo do livro que está tentando registrar não corresponde ao livro que estava lendo. Precisa terminar concluir o livro em andamento para iniciar outro :) - O livro não concluido é ${sessionStorage.TITULO}`)
            continuar = false;
        }
        if (sessionStorage.ID_LENDO == null || sessionStorage.ID_LENDO == undefined) {
            alert(`esse titulo não foi iniciado para poder ser finalizado. Portanto não é possivel registrar sua conlusão:(`)
            continuar = false;
        }
        if (continuar == true) {
            condicao = "f";

            insertTabelaRegistroF();
            
            updateCondicaoFinal();

            updateDataFinal();
            sessionStorage.ID_LENDO = null;
            sessionStorage.ID_LIVRO = null;
            sessionStorage.TITULO = null;
            sessionStorage.ID_REGISTRO_I = null;
            sessionStorage.DATA_INICIAL = null;
        
        }
        somaPaginas();
    }
    // alert(`${nomeLivro}, ${totalPaginas}, ${totalPagLidasHoje}, ${dia}, ${mes}, ${ano}, ${diaSemana}, ${condicao}`)


    ipt_titulo.value = '';
    cond.value = '';
}

function insertTabelaLivro() {
    var nomeLivro = ipt_titulo.value;
    var nomeAutor = ipt_autor.value;
    var totalPaginas = ipt_totalPag.value;

    // Enviando o valor da nova input
    fetch("/livros/cadastrarLivro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/livros.js
            tituloServer: nomeLivro,
            autorServer: nomeAutor,
            totalPagServer: totalPaginas


        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            // cardErro.style.display = "block";

            alert("Livro cadastrado com sucesso")
            // limparFormulario();
            selectLivroCadastrado()

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function insertTabelaRegistroI() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var idLivro = sessionStorage.ID_LIVRO;

    var dia = ipt_dia.value;
    var mes = messesR.value;
    var ano = ipt_ano.value;


    var diaSemana = diasR.value;
    var totalPagLidasHoje = ipt_lidas.value;
    var condicao = "i";

    // Ajustar mes para numero para inserir na tabela registro
    var mesNumerico = '';

    if (mes == "Janeiro") {
        mesNumerico = "01";
    } else if (mes == "Fevereiro") {
        mesNumerico = "02";
    } else if (mes == "Março") {
        mesNumerico = "03";
    } else if (mes == "Abril") {
        mesNumerico = "04";
    } else if (mes == "Maio") {
        mesNumerico = "05";
    } else if (mes == "Junho") {
        mesNumerico = "06";
    } else if (mes == "Julho") {
        mesNumerico = "07";
    } else if (mes == "Agosto") {
        mesNumerico = "08";
    } else if (mes == "Setembro") {
        mesNumerico = "09";
    } else if (mes == "Outubro") {
        mesNumerico = "10";
    } else if (mes == "Novembro") {
        mesNumerico = "11";
    } else if (mes == "Dezembro") {
        mesNumerico = "12";
    }

    // Enviando o valor da nova input
    fetch("/registros/inserirRegistroI", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/livros.js
            idUsuarioServer: idUsuario,
            idLivroServer: idLivro,
            diaServer: dia,
            mesServer: mes,
            anoServer: ano,
            diaSemanaServer: diaSemana,
            pagHojeServer: totalPagLidasHoje,
            condicaoServer: condicao,
            mesNumericoServer: mesNumerico

        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            // cardErro.style.display = "block";

            alert("Registro realizado com sucesso!")
            alert("O Registro Inicial foi realizado com sucesso;")
            // limparFormulario();
            // selectLivroCadastrado()

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
            alert("Cofira se inseriu corretamente os dados nos campos. ATENÇÂO!!! para dias como 1, 2, 3, 4,...,9 FAVOR INSERIR UM '0' na frente. EXEMPLO: 01, 02,,03...,09.")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

// ---------------------------- Lendo 2º ---------------------------

function insertTabelaRegistroL() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var idLivro = sessionStorage.ID_LIVRO;

    var dia = ipt_dia.value;
    var mes = messesR.value;
    var ano = ipt_ano.value;


    var diaSemana = diasR.value;
    var totalPagLidasHoje = ipt_lidas.value;
    var condicao = "l";

    var dataInicial = sessionStorage.DATA_INICIAL;

    // Enviando o valor da nova input
    fetch("/registros/inserirRegistroL", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/livros.js
            idUsuarioServer: idUsuario,
            idLivroServer: idLivro,
            diaServer: dia,
            mesServer: mes,
            anoServer: ano,
            diaSemanaServer: diaSemana,
            pagHojeServer: totalPagLidasHoje,
            condicaoServer: condicao,
            dataInicialServer: dataInicial

        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            // cardErro.style.display = "block";

            alert("Registro realizado com sucesso!")
            alert("O Registro Lendo foi realizado com sucesso;")
            // limparFormulario();
            // selectLivroCadastrado()

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
            alert("Cofira se inseriu corretamente os dados nos campos. ATENÇÂO!!! para dias como 1, 2, 3, 4,...,9 FAVOR INSERIR UM '0' na frente. EXEMPLO: 01, 02,,03...,09.")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

// ---------------------------- Finalizado 3º ---------------------------

function insertTabelaRegistroF() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var idLivro = sessionStorage.ID_LIVRO;

    var dia = ipt_dia.value;
    var mes = messesR.value;
    var ano = ipt_ano.value;


    var diaSemana = diasR.value;
    var totalPagLidasHoje = ipt_lidas.value;
    var condicao = "f";

    var dataInicial = sessionStorage.DATA_INICIAL;

    // Ajustar mes para numero para inserir na tabela registro
    var mesNumerico = '';

    if (mes == "Janeiro") {
        mesNumerico = "01";
    } else if (mes == "Fevereiro") {
        mesNumerico = "02";
    } else if (mes == "Março") {
        mesNumerico = "03";
    } else if (mes == "Abril") {
        mesNumerico = "04";
    } else if (mes == "Maio") {
        mesNumerico = "05";
    } else if (mes == "Junho") {
        mesNumerico = "06";
    } else if (mes == "Julho") {
        mesNumerico = "07";
    } else if (mes == "Agosto") {
        mesNumerico = "08";
    } else if (mes == "Setembro") {
        mesNumerico = "09";
    } else if (mes == "Outubro") {
        mesNumerico = "10";
    } else if (mes == "Novembro") {
        mesNumerico = "11";
    } else if (mes == "Dezembro") {
        mesNumerico = "12";
    }

    // Ajustar mes para numero para inserir na tabela registro
    var dataInicial = sessionStorage.DATA_INICIAL;

    // Enviando o valor da nova input
    fetch("/registros/inserirRegistroF", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/livros.js
            idUsuarioServer: idUsuario,
            idLivroServer: idLivro,
            diaServer: dia,
            mesServer: mes,
            anoServer: ano,
            diaSemanaServer: diaSemana,
            pagHojeServer: totalPagLidasHoje,
            condicaoServer: condicao,
            dataInicialServer: dataInicial,
            mesNumericoServer: mesNumerico

        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            // cardErro.style.display = "block";

            alert("Registro realizado com sucesso!")
            alert("O Registro Final foi realizado com sucesso;")
            // limparFormulario();
            // selectLivroCadastrado()

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
            alert("Cofira se inseriu corretamente os dados nos campos. ATENÇÂO!!! para dias como 1, 2, 3, 4,...,9 FAVOR INSERIR UM '0' na frente. EXEMPLO: 01, 02,,03...,09.")
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function updateDataFinal() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var idLivro = sessionStorage.ID_LIVRO;

    var dia = ipt_dia.value;
    var mes = messesR.value;
    var ano = ipt_ano.value;
    var mesNumerico = '';

    if (mes == "Janeiro") {
        mesNumerico = "01";
    } else if (mes == "Fevereiro") {
        mesNumerico = "02";
    } else if (mes == "Março") {
        mesNumerico = "03";
    } else if (mes == "Abril") {
        mesNumerico = "04";
    } else if (mes == "Maio") {
        mesNumerico = "05";
    } else if (mes == "Junho") {
        mesNumerico = "06";
    } else if (mes == "Julho") {
        mesNumerico = "07";
    } else if (mes == "Agosto") {
        mesNumerico = "08";
    } else if (mes == "Setembro") {
        mesNumerico = "09";
    } else if (mes == "Outubro") {
        mesNumerico = "10";
    } else if (mes == "Novembro") {
        mesNumerico = "11";
    } else if (mes == "Dezembro") {
        mesNumerico = "12";
    }
    fetch(`/registros/updateDataFinal/${idUsuario}/${idLivro}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            IdUsuarioServer: idUsuario,
            idLivroServer: idLivro,
            diaServer: dia,
            mesNumericoServer: mesNumerico,
            anoServer: ano
        }),
    })
        .then(function (resposta) {
            console.log(resposta);
            alert("dataFinal inserido em todos")
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
// _____________________________________Update condição 'f'_______________________
function updateCondicaoFinal() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var idLivro = sessionStorage.ID_LIVRO;

    fetch(`/registros/updateCondicaoFinal/${idUsuario}/${idLivro}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            IdUsuarioServer: idUsuario,
            idLivroServer: idLivro
        }),
    })
        .then(function (resposta) {
            console.log(resposta);
            alert("condição = 'f'")
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
// ---\\---

function selectLivrosExistentes() { //ATUALIZAR DATALIST DOS PONTOS
    //   var nomeLivro = ipt_titulo.value;

    fetch("/livros/listar").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("todosOsLivros");
                var mensagem = document.createElement("option");
                var feed02 = document.getElementById("todosOsAutores");
                var mensagem02 = document.createElement("option");
                mensagem.innerHTML = "Nenhum resultado encontrado." //SE NÂO APARECER NADA, MUDAR AQUI
                feed.appendChild(mensagem);
                mensagem02.innerHTML = "Nenhum resultado encontrado." //SE NÂO APARECER NADA, MUDAR AQUI
                feed02.appendChild(mensagem02);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                // pontos = resposta;

                var feed = document.getElementById("todosOsLivros");
                var feed02 = document.getElementById("todosOsAutores");
                feed.innerHTML = "";
                feed02.innerHTML = "";

                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var opcao = document.createElement("option");

                    opcao.innerHTML = `${publicacao.nome}`;

                    feed.appendChild(opcao);
                }
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var opcao = document.createElement("option");

                    opcao.innerHTML = `${publicacao.nomeAutor}`;

                    feed02.appendChild(opcao);
                }
            });
        } else {
            throw ("Houve um erro na API")
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

// Tentativa de exibir no scroll
function selectRegistrosNAOfinalizados() {
   var idUsuario = sessionStorage.ID_USUARIO;
   var idLivro = sessionStorage.ID_LIVRO;

    fetch(`/registros/listar/${idUsuario}/${idLivro}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {

                var feed = document.getElementById("registrando");
                var mensagem = document.createElement("scroll-page");
                
                mensagem.innerHTML = "Nenhum resultado encontrado." //SE NÂO APARECER NADA, MUDAR AQUI
                feed.appendChild(mensagem);
                
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                // pontos = resposta;

                var feed = document.getElementById("registrando");
                feed.innerHTML = "";

                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];

                    var registro = document.createElement("scroll-page");

                    registro.innerHTML = `Título: ${publicacao.nome} - DATA: ${publicacao.dia}/${publicacao.mes}/${publicacao.ano} - ${publicacao.diaSemana} - ${publicacao.qtdPagDia} página(s) lida(s) - (${publicacao.qtdTotalPag});`;

                    feed.appendChild(registro);
                }
               
            });
        } else {
            throw ("Houve um erro na API")
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}
// -----\\----
function selectLivroCadastrado() {
    var nomeLivro = ipt_titulo.value;
    // var nomeAutor = ipt_autor.value;
    // var totalPaginas = ipt_totalPag.value;

    fetch(`/livros/autenticar/${nomeLivro}`, {
        cache: "no-store",
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO SELECT LivroCadastrado()!!!!!!!!!!!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.ID_LIVRO = json.idLivro;
            });
        } else {
            console.log("Houve um erro ao tentar realizar o SELECT!!!!!!!!!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}
// alert(sessionStorage.ID_LENDO);


function selectLendo() {
    var usuario = sessionStorage.ID_USUARIO;
    // var nomeAutor = ipt_autor.value;
    // var totalPaginas = ipt_totalPag.value;

    fetch(`/registros/lendo/${usuario}`, {
        cache: "no-store",
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO SELECT selectLendo()!!!!!!!!!!!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.ID_LENDO = json.idLivro;
                sessionStorage.TITULO = json.nome;
                sessionStorage.DATA_INICIAL = json.dataInicial;


            });

        } else {
            console.log("Houve um erro ao tentar realizar o SELECT!!!!!!!!!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}

// ---\\---
function selectID_REGISTROIniciado() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var idLivro = sessionStorage.ID_LIVRO;

    // var nomeAutor = ipt_autor.value;
    // var totalPaginas = ipt_totalPag.value;

    fetch(`/registros/pegarId/${idUsuario}/${idLivro}`, {
        cache: "no-store",
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO selectID_REGISTROIniciado()!!!!!!!!!!!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.ID_REGISTRO_I = json.idRegistro;
            });
        } else {
            console.log("Houve um erro ao tentar realizar o SELECT do idRegistro!!!!!!!!!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}