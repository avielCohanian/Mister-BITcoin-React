import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggingUser } from '../store/actions/userActions';
import { Register } from './Register';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';

export const LoginSignupPage = (props) => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    setUser({ ...user, [field]: value });
  };

  const signup = (user) => {
    dispatch(setLoggingUser(user));
    props.history.push('/');
  };
  const loginUser = () => {
    setLogin(!login);
  };

  const register = (ev) => {
    ev.preventDefault();
    if (user.name && user.password) {
      signup(user);
    }
  };

  return (
    <div className="signup-page">
      {!login ? (
        <Register signup={signup} loginUser={loginUser}></Register>
      ) : (
        <form onSubmit={register} className="form-login">
          <div className="field">
            <label className="field-icon">
              <AccountCircleSharpIcon className="material-icons"></AccountCircleSharpIcon>
            </label>
            <input
              type="text"
              className="field-input"
              onChange={handleChange}
              value={user.name}
              name="name"
              id="name"
              placeholder="Name"
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
          <h4>
            Not registered yet?
            <br />
            <a className="login-user-btn" onClick={loginUser}>
              Click <span> here </span> to SignUp
            </a>
          </h4>
        </form>
      )}
    </div>
  );
};
