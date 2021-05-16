import React, { useState } from "react";
import  { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { hideModal } from '../../store/modal'


const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const sessionLoaded = useSelector(state => state.session.loaded)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
      .catch(err => setErrors(err.errors));
    if (errors.length === 0) dispatch(hideModal())
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (sessionLoaded && user) {
    return <Redirect to={`/users/${user.id}`} />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, idx) => (
          <div key={idx}> {error} </div>
        ))}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
      </div>
        <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
