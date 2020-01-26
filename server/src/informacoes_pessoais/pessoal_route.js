'use strict'

const express = require('express')

const { schemaValidation, asyncHandler, httpCode } = require('../utils')

const { verifyLogin, verifyAdmin } = require('../login')

const pessoalCtrl = require('./pessoal_ctrl')
const pessoalSchema = require('./pessoal_schema')

const router = express.Router()

router.get(
  '/tipo_posto_grad',
  asyncHandler(async (req, res, next) => {
    const dados = await pessoalCtrl.getTipoPostoGrad()

    const msg = 'Tipos de Posto e Graduação retornados com sucesso'

    return res.sendJsonAndLog(true, msg, httpCode.OK, dados)
  })
)

router.get(
  '/tipo_turno',
  asyncHandler(async (req, res, next) => {
    const dados = await pessoalCtrl.getTipoTurno()

    const msg = 'Tipos de Turno retornados com sucesso'

    return res.sendJsonAndLog(true, msg, httpCode.OK, dados)
  })
)

router.get(
  '/completo',
  verifyAdmin,
  asyncHandler(async (req, res, next) => {
    const dados = await pessoalCtrl.getInfoPessoal()
    const msg = 'Informações dos usuários retornadas com sucesso'

    return res.sendJsonAndLog(true, msg, httpCode.OK, dados)
  })
)

router.put(
  '/completo/:uuid',
  schemaValidation({
    body: pessoalSchema.atualizacaoInfo,
    params: pessoalSchema.uuidParams
  }),
  verifyAdmin,
  asyncHandler(async (req, res, next) => {
    await pessoalCtrl.updateInfoPessoal(
      req.params.uuid,
      req.body.tipo_turno_id,
      req.body.cpf,
      req.body.identidade,
      req.body.validade_identidade,
      req.body.orgao_expedidor,
      req.body.endereco,
      req.body.banco,
      req.body.agencia,
      req.body.conta_bancaria,
      req.body.data_nascimento,
      req.body.celular,
      req.body.email_eb
    )

    const msg = 'Informação do usuário atualizada com sucesso'

    return res.sendJsonAndLog(true, msg, httpCode.OK)
  })
)

router.get(
  '/:uuid',
  schemaValidation({ params: pessoalSchema.uuidParams }),
  verifyLogin,
  asyncHandler(async (req, res, next) => {
    const dados = await pessoalCtrl.getInfoPessoalUsuario(req.params.uuid)

    const msg = 'Informação do usuário retornada com sucesso'

    return res.sendJsonAndLog(true, msg, httpCode.OK, dados)
  })
)

router.put(
  '/:uuid',
  schemaValidation({
    body: pessoalSchema.atualizacaoInfo,
    params: pessoalSchema.uuidParams
  }),
  verifyLogin,
  asyncHandler(async (req, res, next) => {
    await pessoalCtrl.updateInfoPessoal(
      req.params.uuid,
      req.body.tipo_turno_id,
      req.body.cpf,
      req.body.identidade,
      req.body.validade_identidade,
      req.body.orgao_expedidor,
      req.body.endereco,
      req.body.banco,
      req.body.agencia,
      req.body.conta_bancaria,
      req.body.data_nascimento,
      req.body.celular,
      req.body.email_eb
    )

    const msg = 'Informação do usuário atualizada com sucesso'

    return res.sendJsonAndLog(true, msg, httpCode.OK)
  })
)

module.exports = router
