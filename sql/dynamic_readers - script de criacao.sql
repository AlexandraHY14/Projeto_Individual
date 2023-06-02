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
);

select * from usuario;

create table livro (
idLivro int primary key auto_increment,
nome varchar(50) not null,
nomeAutor varchar(50),
qtdTotalPag int not null,
dataInicial date, -- not null
dataFinal date,
texto varchar(1500)
);

create table usuarioLivro(
idUsuarioLivro int primary key auto_increment,
fkUsuario int,
foreign key (fkUsuario) references usuario(idUsuario),
fkLivro int,
foreign key (fkLivro) references livro(idLivro),
dia int, -- ou char(2)
mes varchar(10) not null, -- constraint para messes...
ano int not null, -- ou char(4)
diaSemana varchar(15) not null, -- constraint para dias da semana...
qtdPagDia int,
condicao char(1) not null,
constraint chkcondicao check (condicao = 'i' or condicao = 'l'  or condicao = 'f' )
);
insert into usuario values (null, 'Alexandra Harumi', 'alexandra@gmail.com', '1234'),
                           (null, 'Gustavo Pereira', 'gustavo@gmail.com', 'gustavo');


insert into livro values (null, 'Tubarão', 'Peter Benchley', 335, '2020-02-01', '2020-02-04', null),
                         (null, 'A Guerra dos Tronos - 1',	'George R.R. Martin', 587, '2023-05-10', null, null),
						 (null, 'O cortiço', 'Aluísio Azevedo', 292, '2023-04-04', null, null);
                         
insert into usuarioLivro values(null, 1, 1, 01, 'Fevereiro', 2020, 'Fim de Semana', 75, 'i'),
                               (null, 1, 1, 02, 'Fevereiro', 2020, 'Fim de Semana', 75, 'l'),
                               (null, 1, 1, 03, 'Fevereiro', 2020, 'Segunda', 78, 'l'),
                               (null, 1, 1, 04, 'Fevereiro', 2020, 'Terça', 78, 'f'),
                               (null, 1, 2, 11, 'Maio', 2023, 'Quinta', 30, 'l'),
                               (null, 1, 2, 10, 'Maio', 2023, 'Quarta', 13, 'i'),
                               (null, 1, 2, 12, 'Maio', 2023, 'Sexta', 41, 'l'),
                               (null, 1, 2, 13, 'Maio', 2023, 'Fim de Semana', 22, 'l'),
                               (null, 2, 3, 04, 'Abril', 2023, 'Quinta', 10, 'i'),
                               (null, 2, 3, 05, 'Abril', 2023, 'Sexta', 12, 'l'),
                               (null, 2, 3, 06, 'Abril', 2023, 'Sabado', 20, 'l'),
                               (null, 2, 3, 07, 'Abril', 2023, 'Fim de Semana', 25, 'l');
                               
                               select * from usuarioLivro;
                               select * from usuario;
                               
                               select * from livro;
							
-- levar para a coluna de concluidos dos registros
select * from usuario join usuarioLivro on fkUsuario = idUsuario where condicao = "f" and fkUsuario = 1;
                               

-- Para colocar os dados nos não concluidos
select fkUsuario,fklivro from usuarioLivro join livro on fkLivro = idLivro where fkUsuario = 1;
select * from usuarioLivro join livro on fkLivro = idLivro where fkUsuario = 1 and dataFinal is null;

insert into usuarioLivro values (null, 1, 2, 14, 'Maio', 2023, 'Fim de Semana', 23, 'l');

-- Contar quantas vezes vai se repetir para exibir antes de ser concluido
select count(idUsuarioLivro) from usuarioLivro join livro on fkLivro = idLivro where fkUsuario = 1 and dataFinal is null;

-- Grafico Pie
select avg(qtdPagDia) from usuarioLivro where fkUsuario = 1 and diaSemana = 'Fim de Semana'; 
                       
-- Grafico Linha - Adicionar mais livros finalizados e não finalizados no mes de fevereiro;
select avg(qtdPagDia) from usuarioLivro where fkUsuario = 1 and mes = 'Fevereiro' and ano = 2020; 
