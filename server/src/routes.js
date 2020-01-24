'use strict'
const express = require('express')

const { databaseVersion } = require('./database')
const {
  httpCode
} = require('./utils')

const { loginRoute } = require('./login')
const { usuarioRoute } = require('./usuario')
const { pessoalRoute } = require('./informacoes_pessoais')

const router = express.Router()

router.get('/', (req, res, next) => {
  return res.sendJsonAndLog(
    true,
    'Serviço do Sistema de Controle de RH operacional',
    httpCode.OK,
    {
      database_version: databaseVersion.nome
    }
  )
})

router.use('/login', loginRoute)

router.use('/usuarios', usuarioRoute)

router.use('/informacoes_pessoais', pessoalRoute)

module.exports = router
