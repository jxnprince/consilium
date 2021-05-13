import React,{ useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import { login } from '../../store/session'
import {showModal, setCurrentModal, hideModal } from '../../store/modal'
import SignUpForm from '../auth/SignUpForm'
import './splash.css'

export default function SplashLayout () {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state?.session?.user)
  const path = user?.superUser ? `/users/${user?.id}/artists` : `/users/${user?.id}`

  useEffect(()=>{ 
  if (user)history.push(path) 
  else history.push('/')
  },[user, path, history])

  const showSignup = () =>{
		dispatch(setCurrentModal(SignUpForm))
		dispatch(showModal())
	}
	
	  const handleGuest = () =>{
    dispatch(hideModal)
    dispatch(login('jxnP@bms.com','password'))
  }

return(
<>
  <Container id="splash-main">
    <Col className="splash-info-div">
      <Col id="logo" />
      <Row id="join-btn-container">

        <div className="button-border">
          <button id="join-btn" onClick={showSignup}>
            Sign Up Today
          </button>
        </div>

        <div className="button-border">
          <button id="join-btn" onClick={handleGuest}>
            Take a Tour
          </button>
        </div>

      </Row>

    </Col>
  </Container>
</>
)
}
