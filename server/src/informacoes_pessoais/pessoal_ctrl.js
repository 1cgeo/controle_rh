'use strict'

const { db } = require('../database')

const { AppError, httpCode } = require('../utils')

const controller = {}

controller.getUsuario = async uuid => {
  const usuario = await db.conn.oneOrNone(
    `SELECT id, uuid, login, nome, nome_guerra, tipo_turno_id, tipo_posto_grad_id,
    cpf, identidade, validade_identidade, orgao_expedidor, banco, agencia,
    conta_bancaria, data_nascimento, celular, email_eb
    FROM dgeo.usuario WHERE uuid = $<uuid> AND ativo IS TRUE`,
    { uuid }
  )

  if (!usuario) {
    throw new AppError('Usuário não encontrado', httpCode.NotFound)
  }

  return usuario
}

controller.updateUsuario = async (
  uuid,
  nome,
  nomeGuerra,
  tipoTurnoId,
  tipoPostoGradId,
  cpf,
  identidade,
  validadeIdentidade,
  orgaoExpedidor,
  banco,
  agencia,
  contaBancaria,
  dataNascimento,
  celular,
  emailEb
) => {
  const result = await db.conn.result(
    `UPDATE dgeo.usuario
    SET nome = $<nome>, nome_guerra = $<nomeGuerra>, tipo_turno_id = $<tipoTurnoId>, tipo_posto_grad_id = $<tipoPostoGradId>,
    cpf = $<cpf>, identidade = $<identidade>, validade_identidade = $<validadeIdentidade>, orgao_expedidor = $<orgaoExpedidor>,
    banco = $<banco>, agencia = $<agencia>, conta_bancaria = $<contaBancaria>, data_nascimento = $<dataNascimento>, 
    celular = $<celular>, email_eb = $<emailEb>
    WHERE uuid = $<uuid> AND ativo IS TRUE`,
    {
      uuid,
      nome,
      nomeGuerra,
      tipoTurnoId,
      tipoPostoGradId,
      cpf,
      identidade,
      validadeIdentidade,
      orgaoExpedidor,
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

controller.updateUsuarioCompleto = async (
  uuid,
  login,
  nome,
  nomeGuerra,
  administrador,
  ativo,
  tipoTurnoId,
  tipoPostoGradId,
  cpf,
  identidade,
  validadeIdentidade,
  orgaoExpedidor,
  banco,
  agencia,
  contaBancaria,
  dataNascimento,
  celular,
  emailEb
) => {
  const result = await db.conn.result(
    `UPDATE dgeo.usuario
    SET login = $<login>, nome = $<nome>, nome_guerra = $<nomeGuerra>, tipo_turno_id = $<tipoTurnoId>, 
    tipo_posto_grad_id = $<tipoPostoGradId>, ativo = $<ativo>, administrador = $<administrador>,
    cpf = $<cpf>, identidade = $<identidade>, validade_identidade = $<validadeIdentidade>, orgao_expedidor = $<orgaoExpedidor>,
    banco = $<banco>, agencia = $<agencia>, conta_bancaria = $<contaBancaria>, data_nascimento = $<dataNascimento>, 
    celular = $<celular>, email_eb = $<emailEb>
    WHERE uuid = $<uuid>`,
    {
      uuid,
      login,
      nome,
      nomeGuerra,
      tipoTurnoId,
      tipoPostoGradId,
      ativo,
      administrador,
      cpf,
      identidade,
      validadeIdentidade,
      orgaoExpedidor,
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
