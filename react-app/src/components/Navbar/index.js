import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {showModal, setCurrentModal} from '../../store/modal'
import loginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import { login } from '../../store/session';
import { Container, Col } from 'react-bootstrap';
import SessionSwitch from '../auth/sessionSwitch'
import aboutBolt from '../Assets/aboutBolt.png'
import aboutBoltGrey from '../Assets/aboutBoltGrey.png'
import './navbar.css'

export default function NavbarLeft() {
  const dispatch = useDispatch()
  const user = useSelector(state => state?.session?.user)
	const path = user?.superUser ? `/users/${user?.id}/artists` : `/users/${user?.id}/`
	const [bolt, setBolt] = useState(aboutBolt);

	const DashButton = () =>{
	return (
	<a className="btn btn-primary" href={path} className="nav-buttons">
    <i className="fas fa-th-large"></i>
  </a>
	)
	}
	
	const AboutButton = () =>{
	return (
	<a className="btn btn-primary" href='https://github.com/jxnprince/consilium/tree/main#readme' className="nav-buttons">
    <img 
      className="about-bolt" 
      src={bolt}
      onMouseEnter={() => setBolt(aboutBoltGrey)} 
      onMouseLeave={() => setBolt(aboutBolt)}
      ></img>
    {/* research .toggleClass() */}
  </a>
	)
	}
	
	
	if (!user){
    return (
      <Col id="outer-nav">
        <Container id="main-nav">
          <SessionSwitch />
          <hr/>
          <AboutButton />
        </Container>
      </Col>
    )
  } else if (user){
    return(
      <Col id="outer-nav">
        <Container id="main-nav">
          <SessionSwitch />
          <hr/>
          <DashButton />
          <AboutButton />
        </Container>
      </Col>
  )
  }
}


