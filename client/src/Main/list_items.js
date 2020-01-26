import React from 'react'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import InsertChartIcon from '@material-ui/icons/InsertChart'
import Tooltip from '@material-ui/core/Tooltip'
import PersonIcon from '@material-ui/icons/Person'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'
import EventIcon from '@material-ui/icons/Event'
import ViewWeekIcon from '@material-ui/icons/ViewWeek'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'

import styles from './styles'

export const MainListItems = props => {
  const classes = styles()

  return (
    <List>
      <Divider />
      <Tooltip title='Informações do usuário' placement='right-start'>
        <ListItem button component={NavLink} replace exact to='/' activeClassName={classes.active}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Informações do usuário' />
        </ListItem>
      </Tooltip>

      <Tooltip title='Calendário pessoal' placement='right-start'>
        <ListItem button component={NavLink} replace exact to='/calendario_pessoal' activeClassName={classes.active}>
          <ListItemIcon>
            <PermContactCalendarIcon />
          </ListItemIcon>
          <ListItemText primary='Calendário pessoal' />
        </ListItem>
      </Tooltip>

    </List>
  )
}

export const AdminListItems = props => {
  const classes = styles()

  return (
    <List>
      <Divider />
      <ListSubheader inset>Administração</ListSubheader>

      <Tooltip title='Dashboard' placement='right-start'>
        <ListItem button component={NavLink} replace exact to='/dashboard' activeClassName={classes.active}>
          <ListItemIcon>
            <InsertChartIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
      </Tooltip>

      <Tooltip title='Calendário geral' placement='right-start'>
        <ListItem button component={NavLink} replace exact to='/calendario_geral' activeClassName={classes.active}>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary='Calendário geral' />
        </ListItem>
      </Tooltip>

      <Tooltip title='Tabela semanal' placement='right-start'>
        <ListItem button component={NavLink} replace exact to='/tabela_semanal' activeClassName={classes.active}>
          <ListItemIcon>
            <ViewWeekIcon />
          </ListItemIcon>
          <ListItemText primary='Tabela semanal' />
        </ListItem>
      </Tooltip>

      <Tooltip title='Gerenciar usuários' placement='right-start'>
        <ListItem button component={NavLink} replace exact to='/gerenciar_usuarios' activeClassName={classes.active}>
          <ListItemIcon>
            <VerifiedUserIcon />
          </ListItemIcon>
          <ListItemText primary='Gerenciar usuários' />
        </ListItem>
      </Tooltip>

    </List>
  )
}
