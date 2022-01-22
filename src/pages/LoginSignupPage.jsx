import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../store/actions/userActions';
import { Register } from './Register';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';

export const LoginSignupPage = (props) => {
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.userModule);

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    setUser({ ...user, [field]: value });
  };

  const signup = async (user) => {
    const addUser = await dispatch(signupUser(user));
    if (!addUser) return;
    props.history.push('/');
  };
  const login = () => {
    setIsLogin(!isLogin);
  };

  const register = async (ev) => {
    ev.preventDefault();
    if (user.name && user.password) {
      const isLoginUser = await dispatch(loginUser(user));
      if (isLoginUser) props.history.push('/');
    }
  };
  return (
    <div className="signup-page">
      <h4 className="login-user-btn">
        <a onClick={login}>{!isLogin ? <h4> Login </h4> : <h4> SignUp</h4>}</a>
      </h4>

      {!isLogin ? (
        <Register signup={signup} login={login}></Register>
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
          <button>Login</button>
        </form>
      )}
    </div>
  );
};