import React from 'react'
import {connect} from 'react-redux'
import {getAllUsersThunk} from '../store/admin'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import FolderIcon from '@material-ui/icons/Folder'
import DeleteIcon from '@material-ui/icons/Delete'
import {Container} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

/**
 * COMPONENT
 */
class AdminUsers extends React.Component {
  componentDidMount = () => {
    this.props.getAllUsers()
  }

  render() {
    const {users} = this.props
    return (
      <Container>
        <Typography variant="h6" color="primary" align="center">
          Welcome To Admin Users Page
        </Typography>
        <Grid container spacing={3}>
          {users.length ? (
            users.map((user, index) => (
              <Grid item md={4} key={index}>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.email} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Grid>
            ))
          ) : (
            <div>'No Users Availalbe'</div>
          )}
        </Grid>
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    users: state.admin.users
  }
}

const mapDispatch = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsersThunk())
  }
}

export default connect(mapState, mapDispatch)(AdminUsers)
