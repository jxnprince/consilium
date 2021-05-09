import React,{ useState, useEffect } from 'react';
import { Switch } from '@material-ui/core/';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import {showModal, setCurrentModal} from '../../store/modal'
import loginForm from '../auth/LoginForm'


export default function SessionSwitch() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [checked, setChecked] = useState(false)
  
  useEffect(()=>{
    !user ? setChecked(false) : setChecked(true)
  },[dispatch, user])
  
  
  const handleChange = () => {
    if (user == null) {
      setChecked(true)
      dispatch(setCurrentModal(loginForm))
      dispatch(showModal())
    }else {
      dispatch(logout())
    }
  };

  return (
    // <Tooltip title={title} placement='right'>
      <Switch
        color="primary"
        onChange={handleChange}
        checked={checked}
      />
    // </Tooltip>
  );
}