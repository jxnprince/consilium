import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import { hideModal } from '../../store/modal'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [superUser, setSuperUser] = useState("");
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(signUp(firstName, lastName, email, password))
        .catch(err => setErrors(err.errors));
      dispatch(hideModal())
  };
}

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateSuperUser = (e) => {
    setSuperUser(e.target.value);
  };
  
  const updateAvatar = (e) => {
    setAvatar(e.target.value);
  };
  

  if (sessionLoaded && user && user.superUser) {
    return <Redirect to={`/users/${user.id}/artists`} />;
  }else if (sessionLoaded && user && !user.superUser){
    return <Redirect to={`/users/${user.id}`} />
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={updateFirstName}
          value={firstName}
          placeholder='Robert'
          ></input>
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="Last Name"
          onChange={updateLastName}
          value={lastName}
          placeholder='Zimmerman'
          ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
          placeholder='bobbyD@thinman.io'
          ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
          placeholder='password'
          ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          onChange={updateAvatar}
          value={avatar}
          required={false}
          placeholder='password'
          ></input>
      </div>
      <div>
        <label>Avatar</label>
        <input
          type="text"
          name="avatar"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder='Image Url'
          ></input>
      </div>
      <div>
        <label>Engineer?</label>
        <input
          id ="check"
          type="checkbox"
          name="superUser"
          onChange={updateSuperUser}
          value={superUser}
        ></input>
      </div>
      <button type="submit">Join</button>
    </form>
  );
};

export default SignUpForm;
