BEGIN;

CREATE SCHEMA dgeo;

CREATE TABLE dgeo.usuario(
	id SERIAL NOT NULL PRIMARY KEY,
  login VARCHAR(255) UNIQUE NOT NULL,
	nome VARCHAR(255) NOT NULL,
  nome_guerra VARCHAR(255) NOT NULL,
  tipo_posto_grad_id SMALLINT NOT NULL REFERENCES dominio.tipo_posto_grad (code),
  administrador BOOLEAN NOT NULL DEFAULT FALSE,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
	uuid UUID NOT NULL UNIQUE,
  tipo_turno_id SMALLINT NOT NULL REFERENCES dominio.tipo_turno (code) DEFAULT 3,
  cpf VARCHAR(255),
  identidade VARCHAR(255),
  validade_identidade TIMESTAMP WITH TIME ZONE,
  orgao_expedidor VARCHAR(255),
  endereco TEXT,
  banco VARCHAR(255),
  agencia VARCHAR(255),
  conta_bancaria VARCHAR(255),
  data_nascimento TIMESTAMP WITH TIME ZONE,
  celular VARCHAR(255),
  email_eb VARCHAR(255) 
);

CREATE TABLE dgeo.perda_recurso_humano(
	id SERIAL NOT NULL PRIMARY KEY,
	usuario_id SMALLINT NOT NULL REFERENCES dgeo.usuario (id),
	tipo_perda_recurso_humano_id SMALLINT NOT NULL REFERENCES dominio.tipo_perda_recurso_humano (code),
	horas REAL,
	data timestamp with time zone NOT NULL,
	observacao TEXT
);

COMMIT;