import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { MessageSnackBar } from '../helpers'
import ReactLoading from 'react-loading'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import moment from 'moment'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import Grid from '@material-ui/core/Grid'

import styles from './styles'
import { getData, setOkUsuarioDia, setFaltaUsuarioDia } from './api'
import { handleApiError } from '../services'

const semanaAtual = () => {
  const today = moment()

  return [today.year(), today.week()]
}

const diasSemanaAtual = (semana) => {
  const dias = []
  for (let i = 1; i <= 5; i++) {
    dias.push(moment(`${semana[0]}-W${semana[1]}-${i}`).format('DD/MM'))
  }
}

const calculaSemanaTxt = (semana) => {
  const primeiroDia = moment(`${semana[0]}-W${semana[1]}-1`).format('DD/MM/YYYY')
  const ultimoDia = moment(`${semana[0]}-W${semana[1]}-5`).format('DD/MM/YYYY')

  return `Semana ${semana[1]}/${semana[0]} - ${primeiroDia} até ${ultimoDia}`
}

export default withRouter(props => {
  const classes = styles()

  const [usuarios, setUsuarios] = useState([])
  const [semana, setSemana] = useState(() => semanaAtual())
  const [dadosUsuarioSemana, setDadosUsuariosSemana] = useState({})
  const [modalState, setModalState] = useState({
    open: false,
    usuario: '',
    dia: ''
  })

  const [snackbar, setSnackbar] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    let isCurrent = true

    const load = async () => {
      try {
        const response = await getData(semana)
        if (!response || !isCurrent) return
        const { usuario, dadosUsuarioSemana } = response
        setUsuarios(usuario)
        setDadosUsuariosSemana(dadosUsuarioSemana)
        setLoaded(true)
      } catch (err) {
        if (!isCurrent) return
        handleApiError(err, setSnackbar)
      }
    }
    load()

    return () => {
      isCurrent = false
    }
  }, [semana, refresh])

  const handleOk = async (uuid, dia) => {
    try {
      const success = await setOkUsuarioDia(uuid, dia)
      if (success) {
        setRefresh(new Date())
      }
    } catch (err) {
      setRefresh(new Date())
      handleApiError(err, setSnackbar)
    }
  }

  const handleFalta = async (uuid, dia, motivo) => {
    try {
      const success = await setFaltaUsuarioDia(uuid, dia, motivo)
      if (success) {
        setRefresh(new Date())
      }
    } catch (err) {
      setRefresh(new Date())
      handleApiError(err, setSnackbar)
    }
  }

  const openModal = (uuid, dia) => {
    setModalState({
      open: true,
      usuario: uuid,
      dia: dia
    })
  }

  const closeModal = () => {
    setModalState({
      open: false,
      usuario: '',
      dia: ''
    })
  }

  const semanaTxt = useMemo(() => calculaSemanaTxt(semana), [semana])
  const diasSemana = useMemo(() => diasSemanaAtual(semana), [semana])

  const semanaAnterior = useCallback(() => {
    setSemana(semana => {
      const segunda = moment(`${semana[0]}-W${semana[1]}-1`)
      const proximaSegunda = segunda.add(7, 'days')
      return [proximaSegunda.year(), proximaSegunda.week()]
    })
  }, [])

  const semanaPosterior = useCallback(() => {
    setSemana(semana => {
      const segunda = moment(`${semana[0]}-W${semana[1]}-1`)
      const segundaAnterior = segunda.subtract(7, 'days')
      return [segundaAnterior.year(), segundaAnterior.week()]
    })
  }, [])

  return (
    <>
      {loaded ? (
        <Container maxWidth='sm'>
          <Paper className={classes.paper}>
            <div className={classes.formArea}>
              <Grid container>
                <Grid item xs>
                  <IconButton component='span' onClick={semanaAnterior}>
                    <NavigateBeforeIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={8}>
                  <Typography component='h1' variant='h5'>
                    Situação efetivo - {semanaTxt}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <IconButton component='span' onClick={semanaPosterior}>
                    <NavigateNextIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      {diasSemana.map((row, i) => (
                        <TableCell key={i} align='right'>{row}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usuarios.map(u => (
                      <TableRow key={u.uuid}>
                        <TableCell component='th' scope='row'>
                          {u.nome}
                        </TableCell>
                        {dadosUsuarioSemana[u.uuid].map((dados, j) => (
                          <TableCell key={j} align='right'>
                            <IconButton color='primary' component='span' onClick={() => handleOk(u.uuid, dados.dia)}>
                              <CheckCircleIcon />
                            </IconButton>
                            <IconButton color='secondary' component='span' onClick={() => handleFalta(u.uuid, dados.dia)}>
                              <CancelIcon />
                            </IconButton>
                          </TableCell>
                        )
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
        </Container>
      )
        : (
          <div className={classes.loading}>
            <ReactLoading type='bars' color='#F83737' height='5%' width='5%' />
          </div>
        )}
      <Modal
        open={modalState.open}
        onClose={closeModal}
      >
        <Card>
          <Typography variant='h6' gutterBottom>Log de Execução</Typography>
          <CardContent>
            {modalState.usuario}
          </CardContent>
        </Card>
      </Modal>
      {snackbar ? <MessageSnackBar status={snackbar.status} key={snackbar.date} msg={snackbar.msg} /> : null}
    </>
  )
})
