import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {showModal, setCurrentModal} from '../../store/modal'
import loginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import { login } from '../../store/session';
import { Container, Button } from 'react-bootstrap';
import SessionSwitch from '../auth/sessionSwitch'
import './navbar.css'

export default function NavbarLeft() {
  const dispatch = useDispatch()
  const user = useSelector(state => state?.session?.user)
	const path = user?.superUser ? `/users/${user?.id}/artists` : `/users/${user?.id}/`
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
	
	const DashButton = () =>{
	return (
	<a className="btn btn-primary" href={path} className="nav-buttons">
    <i className="fas fa-th-large"></i>
  </a>
	)
	}
	
	
	if (!user){
    return (
      <div>
        <Container id="main-nav">
          <SessionSwitch />
          <hr/>
        </Container>
      </div>
    )
  } else if (user){
  return(
      <div>
        <Container id="main-nav">
          <SessionSwitch />
          <hr/>
          <DashButton />
        </Container>
      </div>
  )
  }
}


