BEGIN;

CREATE SCHEMA dominio;

CREATE TABLE dominio.tipo_posto_grad(
	code SMALLINT NOT NULL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL,
	nome_abrev VARCHAR(255) NOT NULL
);

INSERT INTO dominio.tipo_posto_grad (code, nome,nome_abrev) VALUES
(1, 'Civil', 'Civ'),
(2, 'Mão de Obra Temporária', 'MOT'),
(3, 'Soldado EV', 'Sd EV'),
(4, 'Soldado EP', 'Sd EP'),
(5, 'Cabo', 'Cb'),
(6, 'Terceiro Sargento', '3º Sgt'),
(7, 'Segundo Sargento', '2º Sgt'),
(8, 'Primeiro Sargento', '1º Sgt'),
(9, 'Subtenente', 'ST'),
(10, 'Aspirante', 'Asp'),
(11, 'Segundo Tenente', '2º Ten'),
(12, 'Primeiro Tenente', '1º Ten'),
(13, 'Capitão', 'Cap'),
(14, 'Major', 'Maj'),
(15, 'Tenente Coronel', 'TC'),
(16, 'Coronel', 'Cel'),
(17, 'General de Brigada', 'Gen Bda'),
(18, 'General de Divisão', 'Gen Div'),
(19, 'General de Exército', 'Gen Ex');

CREATE TABLE dominio.tipo_turno(
	code SMALLINT NOT NULL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL
);

INSERT INTO dominio.tipo_turno (code, nome) VALUES
(1, 'Manhã'),
(2, 'Tarde'),
(3, 'Integral');

CREATE TABLE dominio.tipo_perda_recurso_humano(
	code SMALLINT NOT NULL PRIMARY KEY,
	nome VARCHAR(255) NOT NULL
);

INSERT INTO dominio.tipo_perda_recurso_humano (code, nome) VALUES
(1, 'Férias'),
(2, 'Desconto em férias'),
(3, 'Dispensa como recompensa'),
(4, 'Dispensa de aniversário'),
(5, 'Dispensa por motivo de saúde'),
(6, 'Feriado'),
(7, 'Dispensa por regresso de atividade de campo'),
(8, 'Serviço'),
(9, 'Atividades militares'),
(10, 'Atividades administrativas'),
(11, 'Problemas técnicos'),
(12, 'Realizando curso / capacitação'),
(13, 'Ministrando curso / capacitação'),
(14, 'Participação em eventos'),
(98, 'Outros');

COMMIT;