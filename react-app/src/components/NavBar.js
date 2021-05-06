import React from 'react';
import { NavLink } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import LogoutButton from './auth/LogoutButton';
import {showModal, setCurrentModal, setModalMount} from '../store/modal'
import loginForm from '../components/auth/LoginForm'
import SignUpForm from '../components/auth/SignUpForm'
import { login } from '../store/session';

const NavBar = () => {
  const dispatch = useDispatch()

  const showLogin = () =>{
    dispatch(setModalMount(loginForm))
    dispatch(showModal())
  }

  const showSignup = () =>{
    dispatch(setModalMount(SignUpForm))
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
          <button onclick={showLogin}> 
            Log In
          </button>
        </li>
        <li>
          <button onclick={showSignup}> 
            Sign Up
          </button>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
