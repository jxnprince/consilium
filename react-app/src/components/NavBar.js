import React from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import {showModal, hideModal, setCurrentModal} from '../store/modal'
import loginForm from '../components/auth/LoginForm'
import SignUpForm from '../components/auth/SignUpForm'
import { login } from '../store/session';

const NavBar = () => {
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
		<nav>
			<button onClick={showLogin}> 
				Log In
			</button>
			
			<button onClick={showSignup}> 
				sign up
			</button>
			
			<button onClick={guestLoginHandler}> 
				Take a tour
			</button>
		</nav>
	)} else if (user && user.superUser){
	return (
		<nav>
			<NavLink to="/" exact={true} activeClassName="active">
				Home
			</NavLink>
			<LogoutButton />
		</nav>
	)} else{
	return (
		<nav>
			<NavLink to="/" exact={true} activeClassName="active">
				Home
			</NavLink>
			<LogoutButton />
		</nav>
	)}
}

export default NavBar;
