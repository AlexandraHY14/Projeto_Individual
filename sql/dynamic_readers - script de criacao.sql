CREATE DATABASE dynamic_readers;
USE dynamic_readers;

CREATE USER IF NOT EXISTS urubu100 IDENTIFIED BY 'urubu100';
GRANT SELECT, INSERT, UPDATE, DELETE ON dynamic_readers.* TO urubu100;
FLUSH PRIVILEGES;

create table usuario(
idUsuario int primary key auto_increment,
nomeUsuario varchar(50),
email varchar(50),
senha varchar(40)
-- nickname varchar(45),
-- mensagem varchar(100),
-- foto varchar(110) ou text
);

select * from usuario;

create table livro (
idLivro int primary key auto_increment,
nome varchar(50) not null,
nomeAutor varchar(50),
qtdTotalPag int not null
);

create table registro(
idRegistro int primary key auto_increment,
fkUsuario int,
foreign key (fkUsuario) references usuario(idUsuario),
fkLivro int,
foreign key (fkLivro) references livro(idLivro),
dia int not null, -- ou char(2)
mes varchar(10) not null, -- constraint para messes...
ano int not null, -- ou char(4)
diaSemana varchar(15) not null, -- constraint para dias da semana...
qtdPagDia int,
condicao char(1) not null,
constraint chkcondicao check (condicao = 'i' or condicao = 'l'  or condicao = 'f' ),
dataInicial char(10), -- not null
dataFinal char(10)
);
create table resumo(
idResumo int primary key auto_increment,
texto varchar(1500), -- ou tipo text
fkRegistro int, -- O idRegistro onde  idUsuario e idLivro pertence a um determinado usuario e livro e a  data final é not null
foreign key (fkRegistro) references registro(idRegistro)
);

insert into usuario values (null, 'Alexandra Harumi', 'alexandra@gmail.com', '1234'),
                           (null, 'Andreza Ayumi', 'andreza@gmail.com', 'ayumi');


insert into livro values (null, 'Tubarão', 'Peter Benchley', 335),
                         (null, 'A Guerra dos Tronos - 1',	'George R.R. Martin', 587),
						 (null, 'O cortiço', 'Aluísio Azevedo', 292);
                         
insert into registro values(null, 1, 1, 01, 'Fevereiro', 2020, 'Fim de Semana', 75, 'f', '01-02-2020', '04-02-2020'),
                               (null, 1, 1, 02, 'Fevereiro', 2020, 'Fim de Semana', 75, 'f', '01-02-2020', '04-02-2020'),
                               (null, 1, 1, 03, 'Fevereiro', 2020, 'Segunda', 78, 'f', '01-02-2020', '04-02-2020'),
                               (null, 1, 1, 04, 'Fevereiro', 2020, 'Terça', 78, 'f', '01-02-2020', '04-02-2020'),
                               
                               (null, 1, 2, 11, 'Maio', 2023, 'Quinta', 30, 'l', '10-05-2023', null),
                               (null, 1, 2, 10, 'Maio', 2023, 'Quarta', 13, 'i', '10-05-2023', null),
                               (null, 1, 2, 12, 'Maio', 2023, 'Sexta', 41, 'l', '10-05-2023', null),
                               (null, 1, 2, 13, 'Maio', 2023, 'Fim de Semana', 22, 'l', '10-05-2023', null),
                               
                               (null, 2, 3, 04, 'Abril', 2023, 'Quinta', 10, 'i', '04-04-2023', null),
                               (null, 2, 3, 05, 'Abril', 2023, 'Sexta', 12, 'l', '04-04-2023', null),
                               (null, 2, 3, 06, 'Abril', 2023, 'Fim de Semana', 20, 'l', '04-04-2023', null),
                               (null, 2, 3, 07, 'Abril', 2023, 'Fim de Semana', 25, 'l', '04-04-2023', null);
                               
                               select * from registro;
                               select * from usuario;
                               select * from livro;
						
-- SELECT distinct idLivro, nome, dataInicial FROM registro JOIN livro ON fkLivro = idLivro WHERE condicao <> 'f' AND fkUsuario = 1;
                               SELECT * FROM livro WHERE nome = 'Tubarão';
                               
-- delete from registro where idRegistro = 16;
-- delete from livro where idLivro in (5,6,7,8,9);
                               SELECT * FROM livro WHERE nome = 'A' AND qtdTotalPag = 200 AND dataInicial = '2023-06-08';
                               
                               select * from registro where condicao <> 'f' and fkLivro = 2 and fkUsuario = 1;
                               SELECT * FROM registro WHERE condicao = 'i' AND fkUsuario = 1 AND fkLivro = 2;
                               
                               select distinct nome, dataInicial, dataFinal, qtdTotalPag from registro join livro on fkLivro = idLivro where condicao = 'f' and fkUsuario = 1;
                               -- selectLivroNaoFinalizado();
                               select distinct(idlivro), nome, dataInicial from registro join livro on fkLivro = idLivro where condicao <> 'f' and fkUsuario = 1;
                               
                               -- APARECER DEBAIXO DO FORMULÀRIO APÒS REGISTRO REALIZADO
                               select * from registro join livro on fkLivro = idLivro where condicao <> 'f' and fkLivro = 2 and fkUsuario = 1;
                               -- se não houver a condição i para um determinado id\livro e id\usuario - emitir um alerta de que ainda não foi iniciado o livro, e não cadastrar;
                               
                               select * from registro where condicao = 'f' and fkLivro = 1 and fkUsuario = 1;
                               -- se houver 1 registro de um idlivro atual e idusuario com condição 'f'
                               -- fazer os dois updates a baixo
                               update registro set dataFinal = '04-02-2020' where condicao <> 'f' and  fkUsuario = 1 and fkLivro = 1;
                               update registro set condicao = 'f' where condicao <> 'f' and fkLivro = 1 and fkUsuario = 1;
                               -- 
                                select * from registro where condicao = 'f' and fkUsuario = 1;
        ;
                               

SELECT max(idRegistro) as idRegistro, nome FROM livro INNER JOIN registro ON fkLivro = idLivro WHERE condicao = 'f' AND fkUsuario = 1 group by nome;
							
-- levar para a coluna de concluidos dos registros
select * from usuario join registro on fkUsuario = idUsuario where condicao = "f" and fkUsuario = 1;
                               

-- Para colocar os dados nos não concluidos
select fkUsuario,fklivro from registro join livro on fkLivro = idLivro where fkUsuario = 1;
select * from registro join livro on fkLivro = idLivro where fkUsuario = 1 and dataFinal is null;

insert into registro values (null, 1, 2, 14, 'Maio', 2023, 'Fim de Semana', 23, 'l','10-05-2023', null);

-- Contar quantas vezes vai se repetir para exibir antes de ser concluido
select count(idRegistro) from registro join livro on fkLivro = idLivro where fkUsuario = 1 and dataFinal is null;

-- Grafico Pie
select avg(qtdPagDia) from registro where fkUsuario = 1 and diaSemana = 'Fim de Semana'; 
                       
-- Grafico Linha - Adicionar mais livros finalizados e não finalizados no mes de fevereiro;
select round(avg(qtdPagDia),2) from registro where fkUsuario = 1 and mes = 'Fevereiro' and ano = 2020; 

select distinct(nome) from registro join livro on fklivro = idLivro where fkusuario = 1;

SELECT sum(qtdPagDia) as total_lido FROM registro where fkUsuario = 1;

-- ___________________________________________________________________________________________________________________

select ano, mes, diaSemana, round(avg(qtdPagDia),2) as mediaPags from registro as reg
	join usuario as u on reg.fkUsuario = u.idUsuario
	where u.idUsuario = 1 and mes like 'Fevereiro' and ano = 2020
    group by ano, mes, diaSemana;
  
  select * from registro;
-- grafico pizza
    select diaSemana, round(avg(qtdPagDia),2) as mediaPags from registro as reg
	join usuario as u on reg.fkUsuario = u.idUsuario
	where u.idUsuario = 1
    group by diaSemana;
    
-- select que pega os meses que o usuario já registrou

SELECT distinct mes FROM registro WHERE fkUsuario = 1;

SELECT distinct ano FROM registro WHERE fkUsuario = 1;

-- Ordenar dias da semana
SELECT distinct diaSemana , round(avg(qtdPagDia),2) as mediaPags,
case when diaSemana = 'Segunda' then '1'
     when diaSemana = 'Terça' then '2'
     when diaSemana = 'Quarta' then '3'
     when diaSemana = 'Quinta' then '4'
     when diaSemana = 'Sexta' then '5'
     when diaSemana = 'Fim de Semana' then '6'
     
     end as diasOrdenados
 FROM registro where fkUsuario = 1 group by diaSemana, diasOrdenados order by diasOrdenados;
 

 
 SELECT distinct diaSemana , round(avg(qtdPagDia),2) as mediaPags, ano, mes,
case when diaSemana = 'Segunda' then '1'
     when diaSemana = 'Terça' then '2'
     when diaSemana = 'Quarta' then '3'
     when diaSemana = 'Quinta' then '4'
     when diaSemana = 'Sexta' then '5'
     when diaSemana = 'Fim de Semana' then '6'
     
     end as diasOrdenados
 FROM registro where fkUsuario = 2  and mes like 'Junho' and ano = 2020 group by diaSemana, diasOrdenados, ano, mes order by diasOrdenados;
 
 
 select distinct max(idRegistro), nome from registro join livro on fkLivro = idLivro where fkUsuario = 1 and condicao = 'f' group by idRegistro;