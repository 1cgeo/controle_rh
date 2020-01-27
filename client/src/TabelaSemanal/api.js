import { api, auth } from '../services'

const getData = async () => {
  const uuid = auth.getUUID()
  return api.axiosAll({
    usuario: api.getData(`/api/informacoes_pessoais/${uuid}`),
    tipoTurno: api.getData('/api/informacoes_pessoais/tipo_turno')
  })
}

const handleUpdate = async (
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
  const uuid = auth.getUUID()
  return api.put(`/api/informacoes_pessoais/${uuid}`, {
    tipo_turno_id: tipoTurnoId,
    cpf: cpf,
    identidade: identidade,
    validade_identidade: validadeIdentidade,
    orgao_expedidor: orgaoExpedidor,
    endereco: endereco,
    banco: banco,
    agencia: agencia,
    conta_bancaria: contaBancaria,
    data_nascimento: dataNascimento,
    celular: celular,
    email_eb: emailEb
  })
}

export { getData, handleUpdate }
