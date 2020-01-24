'use strict'

const Joi = require('joi')

const models = {}

models.uuidParams = Joi.object().keys({
  uuid: Joi.string()
    .guid({ version: 'uuidv4' })
    .required()
})

models.atualizacaoInfo = Joi.object().keys({
  cpf: Joi.string().allow('').required(),
  identidade: Joi.string().allow('').required(),
  validade_identidade: Joi.date().allow(null).required(),
  orgao_expedidor: Joi.string().allow('').required(),
  banco: Joi.string().allow('').required(),
  agencia: Joi.string().allow('').required(),
  conta_bancaria: Joi.string().allow('').required(),
  data_nascimento: Joi.date().allow(null).required(),
  celular: Joi.string().allow('').required(),
  email_eb: Joi.string().allow('').required()
})

module.exports = models
