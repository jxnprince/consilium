import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import Button from '@material-ui/core/Button'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout())
  }

  return <Button onClick={onLogout}>Logout</Button>;
};

export default LogoutButton;
