import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import AlternateEmailSharpIcon from '@mui/icons-material/AlternateEmailSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';
import GoogleIcon from '@mui/icons-material/Google';

export const Login = ({ register, googleRegister, restPass }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    setUser({ ...user, [field]: value });
  };

  const restPassword = () => {
    if (user.email) restPass(user.email);
    else {
      dispatch({
        type: 'USERMSG',
        msg: { txt: `Please enter email and click again.`, typeMsg: '' },
      });
    }
  };

  return (
    <section className="login">
      <form onSubmit={(ev) => register(ev, user)} className="form-login">
        <div className="field">
          <label className="field-icon">
            <AlternateEmailSharpIcon className="material-icons" />
          </label>
          <input
            type="email"
            className="field-input"
            onChange={handleChange}
            value={user.email}
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="field">
          <label className="field-icon">
            <PasswordSharpIcon className="material-icons"></PasswordSharpIcon>
          </label>
          <input
            type="password"
            className="field-input"
            onChange={handleChange}
            value={user.password}
            name="password"
            id="password"
            placeholder="Password"
            required
            autoComplete="on"
          />
        </div>
        <p className="simple-button forgot-password " onClick={restPassword}>
          Forgot Password?
        </p>
        <button className="simple-button">Login</button>
      </form>
      <button className="simple-button google-btn " onClick={googleRegister}>
        <GoogleIcon /> Login with Google
      </button>
    </section>
  );
};
