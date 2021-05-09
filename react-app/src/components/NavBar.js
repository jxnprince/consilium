import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {showModal, setCurrentModal} from '../store/modal'
import loginForm from '../components/auth/LoginForm'
import SignUpForm from '../components/auth/SignUpForm'
import { login } from '../store/session';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core/';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SessionSwitch from './auth/sessionSwitch'



const useStyles = makeStyles((theme) => ({
  root: { display: 'flex' },
  drawerPaper: { width: 60 },
  toolbar: theme.mixins.toolbar,
  content: {
    // backgroundColor: theme.palette.background,
    padding: theme.spacing(5),
  },
}));

export default function NavbarLeft() {
  const classes = useStyles();
  const dispatch = useDispatch()
	
	const showLogin = () =>{
		dispatch(setCurrentModal(loginForm))
		dispatch(showModal())
	}
	
	const showSignup = () =>{
		dispatch(setCurrentModal(SignUpForm))
		dispatch(showModal())
	}
	
	const guestLoginHandler = () =>{
		dispatch(login('jxnP@bms.com', 'password'))
	}
	
	
	const user = useSelector(state => state.session.user)
	if (!user){
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          color="secondary"
        >
          <div className={classes.toolbar} />
          <SessionSwitch />
        </Drawer>
      </div>
    )
  } else if (user){
  return(
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <SessionSwitch />
        <List>
            <ListItem button key='Inbox'>
              <Tooltip title='Dashboard' placement='right'>
                <i className='material-icons'>grid_view</i>
              </Tooltip>
            </ListItem>
        </List>
      </Drawer>
    </div>
  )
  }
}


