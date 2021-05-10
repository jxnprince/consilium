import React,{ useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import {showModal, setCurrentModal} from '../../store/modal'
import loginForm from '../auth/LoginForm'
import Switch from "react-switch";


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
      <Switch
        className="react-switch"
        id="session-switch"
        onChange={handleChange}
        checked={checked}
        onColor="#ffc107"
        offColor="#263238"
        handleDiameter={22}
        BoxShadow="0px 1px 5px rgba(38, 50, 56, 0.2)"
        activeBoxShadow="0px 1px 5px rgba(38, 50, 56, 0.6)"
        height={20}
        width={48}
        uncheckedIcon={false}
        checkedIcon={false}
        uncheckedHandleIcon={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 10,
          borderRadius: 50,
          color: "#263238",
          backgroundColor: "#ffc107",
          paddingRight: 2
        }}
      >
        <i class="fas fa-sign-in-alt"></i>
      </div>
    }
        checkedHandleIcon={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontSize: 10,
          backgroundColor: "#263238",
          borderRadius: 50,
          color: "#ffc107",
          paddingLeft: 2
        }}
      >
        <i class="fas fa-sign-out-alt"></i>
      </div>
    }
      />

  </>
  );
}