import React,{ useState, useEffect } from 'react';
import { Switch, Tooltip, Fab } from '@material-ui/core/';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import {showModal, setCurrentModal} from '../../store/modal'
import loginForm from '../auth/LoginForm'


export default function SessionSwitch({classes}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [status, setStatus] = useState(user)
  const [title, setTitle] = useState('Login')
  
  useEffect(()=>{
    setStatus(user)
    if (!user) setTitle('Login')
    else setTitle('Logout')
    // console.log("=================================================", status)
  },[dispatch, user])
  
  
  const handleChange = () => {
    if (user == null) {
      dispatch(setCurrentModal(loginForm))
      dispatch(showModal())
    }else {
      dispatch(logout())
    }
  };

  return (
    <Tooltip title={title}>
      <Switch
        color="primary"
        onChange={handleChange}
      />
    </Tooltip>
  );
}