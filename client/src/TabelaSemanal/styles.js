import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => ({
  formArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '100vh'
  },
  table: {
    minWidth: 650
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 3),
    elevation: 3
  },
  formControl: {
    margin: theme.spacing(3)
  }
}))

export default styles
