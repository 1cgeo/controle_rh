import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ReactLoading from 'react-loading'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

import { getMotivoPerda } from './api'
import { SubmitButton } from '../helpers'
import styles from './styles'

const DialogoMotivo = ({ open = false, handleDialog }) => {
  const classes = styles()

  const [motivoPerda, setMotivoPerda] = useState('')
  const [listaMotivo, setListaMotivo] = React.useState([])

  const [submitting, setSubmitting] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const handleChange = event => {
    setMotivoPerda(event.target.value)
  }

  useEffect(() => {
    let isCurrent = true
    const load = async () => {
      try {
        const response = await getMotivoPerda()
        if (!response || !isCurrent) return

        setListaMotivo(response)
        setLoaded(true)
      } catch (err) {
        handleDialog('error', 'Ocorreu um erro ao se comunicar com o servidor.')
      }
    }
    load()

    return () => {
      isCurrent = false
    }
  }, [handleDialog, open])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    handleDialog()
  }

  const handleConfirm = async () => {
    try {
      handleDialog('success', motivoPerda)
    } catch (err) {
      setSubmitting(false)
      if (
        'response' in err &&
        'data' in err.response &&
        'message' in err.response.data
      ) {
        handleDialog('error', err.response.data.message)
      } else {
        handleDialog('error', 'Ocorreu um erro ao se comunicar com o servidor.')
      }
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Motivo perda de RH</DialogTitle>
      <DialogContent>
        {loaded ? (
          <FormControl component='fieldset' className={classes.formControl}>
            <RadioGroup name='motivo' value={motivoPerda} onChange={handleChange}>
              {listaMotivo.map(p => (
                <FormControlLabel value={p.code} key={p.code} control={<Radio />} label={p.nome} />
              ))}
            </RadioGroup>
          </FormControl>
        )
          : (
            <div className={classes.loading}>
              <ReactLoading type='bars' color='#F83737' height='40%' width='40%' />
            </div>
          )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' disabled={submitting} autoFocus>
          Cancelar
        </Button>
        <SubmitButton onClick={handleConfirm} color='secondary' disabled={!loaded || !motivoPerda} submitting={submitting}>
          Confirmar
        </SubmitButton>
      </DialogActions>
    </Dialog>
  )
}

export default DialogoMotivo
