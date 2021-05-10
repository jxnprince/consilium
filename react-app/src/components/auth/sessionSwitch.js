import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import {showModal, setCurrentModal} from '../../store/modal'
import loginForm from '../auth/LoginForm'
import Switch from "react-switch";
import './sessionSwitch.css'


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
  <>
  <div id="switch-container">
      <Switch
        className="react-switch"
        id="session-switch"
        onChange={handleChange}
        checked={checked}
        onColor="#E3C06D"
        offColor="#19191F"
        handleDiameter={15}
        boxShadow="0px 1px 5px rgba(38, 50, 56, 0.2)"
        activeBoxShadow="0px 1px 5px rgba(38, 50, 56, 0.6)"
        border={1}
        border-color="#E3C06D"
        height={15}
        width={40}
        uncheckedIcon={false}
        checkedIcon={false}
        uncheckedHandleIcon={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 7,
          borderRadius: 50,
          color: "#19191F",
          backgroundColor: "#E3C06D",
          paddingRight: 2
        }}
      >
        <i className="fas fa-sign-in-alt"></i>
      </div>
    }
        checkedHandleIcon={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 7,
          backgroundColor: "#19191F",
          borderRadius: 50,
          color: "#ffc107",
          paddingLeft: 2
        }}
      >
        <i className="fas fa-sign-out-alt"></i>
      </div>
    }
      />
</div>
  </>
  );
}