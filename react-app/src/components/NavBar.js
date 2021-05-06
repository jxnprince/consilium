import React from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch} from 'react-redux'
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

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
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
          <button onClick={login('jxnP@bms.com', 'password')}> 
            Take a tour
          </button>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
