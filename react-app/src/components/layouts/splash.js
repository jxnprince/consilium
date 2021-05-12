import React,{ useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import {showModal, setCurrentModal} from '../../store/modal'
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

return(
<>
  <Container id="splash-main">
    <Row className="splash-info-div">
      <Col id="logo" />
      <Col id="join-btn-container">
        <button id="join-btn" onClick={showSignup}>
          Sign Up Today
        </button>
      </Col>

    </Row>
  </Container>
</>
)
}
