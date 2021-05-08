import React from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import {showModal, setCurrentModal} from '../store/modal'
import loginForm from '../components/auth/LoginForm'
import SignUpForm from '../components/auth/SignUpForm'
import { login } from '../store/session';
import { withStyles } from '@material-ui/core'
import SessionSwitch from './auth/sessionSwitch'

const styles = {
	flex: {
		flex: 1
	}
}

const NavBar = withStyles(styles)(({classes}) => {
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
		<nav className={classes.flex}>
		<SessionSwitch defaultChecked={false}/>
			<button onClick={showSignup}> 
				sign up
			</button>
			
			<button onClick={guestLoginHandler}> 
				Take a tour
			</button>
		</nav>
	)} else if (user && user.superUser){
	return (
		<nav className={classes.flex}>
			<SessionSwitch defaultChecked={true}/>
			<NavLink to="/" exact={true} activeClassName="active">
				Home
			</NavLink>
		</nav>
	)} else{
	return (
		<nav className={classes.flex}>
			<NavLink to="/" exact={true} activeClassName="active">
				Home
			</NavLink>
		</nav>
	)}
})

export default NavBar;
