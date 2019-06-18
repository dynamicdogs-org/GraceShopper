import React from 'react'
import {connect} from 'react-redux'
import {Link as RouterLink, Route, Switch} from 'react-router-dom'
import Link from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import AdminUsers from './AdminUsers'
import AdminProducts from './AdminProducts'

const drawerWidth = 200

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    color: 'red'
  },
  content: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar
}))

const AdminPage = props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <Link color="inherit" component={RouterLink} to="/adminpage/users">
            <ListItem>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="User" />
            </ListItem>
          </Link>
          <Link color="inherit" component={RouterLink} to="/adminpage/products">
            <ListItem>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/adminpage/users" component={AdminUsers} />
          <Route path="/adminpage/products" component={AdminProducts} />
          <Route path="/" render={() => <div>Welcome to admin page</div>} />
        </Switch>
      </main>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(AdminPage)
