import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout())
  }

  return <button variant='contained' color='primary' onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
