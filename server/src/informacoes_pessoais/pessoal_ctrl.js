'use strict'

const { db } = require('../database')

const { AppError, httpCode } = require('../utils')

const controller = {}

controller.getTipoPostoGrad = async () => {
  return db.conn.any(
    `SELECT code, nome, nome_abrev
    FROM dominio.tipo_posto_grad`
  )
}

controller.getTipoTurno = async () => {
  return db.conn.any(
    `SELECT code, nome
    FROM dominio.tipo_turno`
  )
}

controller.getInfoPessoal = async () => {
  return db.conn.any(
    `SELECT u.uuid, u.login, u.nome, u.nome_guerra, u.tipo_turno_id, u.tipo_posto_grad_id,
    u.administrador, u.ativo, tt.nome AS tipo_turno, tpg.nome AS tipo_posto_grad,
    u.cpf, u.identidade, u.validade_identidade, u.orgao_expedidor, u.endereco, u.banco, u.agencia,
    u.conta_bancaria, u.data_nascimento, u.celular, u.email_eb
    FROM dgeo.usuario AS u
    INNER JOIN dominio.tipo_posto_grad AS tpg ON tpg.code = u.tipo_posto_grad_id
    INNER JOIN dominio.tipo_turno AS tt ON tt.code = u.tipo_turno_id`
  )
}

controller.getInfoPessoalUsuario = async uuid => {
  const result = await db.conn.oneOrNone(
    `SELECT u.uuid, u.login, u.nome, u.nome_guerra, u.tipo_turno_id, u.tipo_posto_grad_id,
    u.administrador, u.ativo, tt.nome AS tipo_turno, tpg.nome AS tipo_posto_grad,
    u.cpf, u.identidade, u.validade_identidade, u.orgao_expedidor, u.endereco, u.banco, u.agencia,
    u.conta_bancaria, u.data_nascimento, u.celular, u.email_eb
    FROM dgeo.usuario AS u
    INNER JOIN dominio.tipo_posto_grad AS tpg ON tpg.code = u.tipo_posto_grad_id
    INNER JOIN dominio.tipo_turno AS tt ON tt.code = u.tipo_turno_id
    WHERE uuid = $<uuid>`, { uuid }
  )

  if (!result) {
    throw new AppError('Usuário não encontrado', httpCode.NotFound)
  }

  return result
}

controller.updateInfoPessoal = async (
  uuid,
  tipoTurnoId,
  cpf,
  identidade,
  validadeIdentidade,
  orgaoExpedidor,
  endereco,
  banco,
  agencia,
  contaBancaria,
  dataNascimento,
  celular,
  emailEb
) => {
  const result = await db.conn.result(
    `UPDATE dgeo.usuario
    SET tipo_turno_id = $<tipoTurnoId>, endereco = $<endereco>, 
    cpf = $<cpf>, identidade = $<identidade>, validade_identidade = $<validadeIdentidade>, orgao_expedidor = $<orgaoExpedidor>,
    banco = $<banco>, agencia = $<agencia>, conta_bancaria = $<contaBancaria>, data_nascimento = $<dataNascimento>, 
    celular = $<celular>, email_eb = $<emailEb>
    WHERE uuid = $<uuid> AND ativo IS TRUE`,
    {
      uuid,
      tipoTurnoId,
      cpf,
      identidade,
      validadeIdentidade,
      orgaoExpedidor,
      endereco,
      banco,
      agencia,
      contaBancaria,
      dataNascimento,
      celular,
      emailEb
    }
  )
  if (!result.rowCount || result.rowCount < 1) {
    throw new AppError('Usuário não encontrado', httpCode.NotFound)
  }
}

module.exports = controller
