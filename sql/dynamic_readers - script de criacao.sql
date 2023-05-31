CREATE DATABASE dynamic_readers;
USE dynamic_readers;

CREATE USER IF NOT EXISTS urubu100 IDENTIFIED BY 'urubu100';
GRANT SELECT, INSERT, UPDATE, DELETE ON dynamic_readers.* TO 'urubu100';
FLUSH PRIVILEGES;

create table usuario(
idUsuario int primary key auto_increment,
nomeUsuario varchar(50),
email varchar(50),
senha varchar(40)
);

select * from usuario;

create table livro(
idLivro int primary key auto_increment,
nome varchar(50) not null,
nomeAutor varchar(50),
totalDePaginas int not null,
dia int not null, -- ou decimal(2)
mes varchar(10) not null,
ano char(4) not null,
qtdPagDia int,
diaSemana varchar(15) not null,
finalizado char(1),
constraint chkfinalizado check (finalizado in ('n','s'))
);

-- resumo varchar(1500)