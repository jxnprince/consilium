import React from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import {showModal, setCurrentModal} from '../store/modal'
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
			<ul>
				<li>
					<button onClick={showLogin}> 
						Log In
					</button>
				</li>
				<li>
					<button onClick={showSignup}> 
						sign up
					</button>
				</li>
				<li>
					<button onClick={guestLoginHandler}> 
						Take a tour
					</button>
				</li>
			</ul>
		</nav>
	)} else if (user && user.superUser){
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<LogoutButton />
				</li>
			</ul>
		</nav>
	)} else{
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<LogoutButton />
				</li>
			</ul>
		</nav>
	)}
}

export default NavBar;
