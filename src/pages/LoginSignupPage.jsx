import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Register } from './Register';
import { Login } from '../cmp/Login';

import { loginUser, signupUser } from '../store/actions/userActions';
import { userService } from '../services/userService';

export const LoginSignupPage = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();

  const signup = async (user) => {
    const addUser = await dispatch(signupUser(user, 'email&password'));
    userMsg(addUser);
  };

  const googleSignup = async () => {
    const addUser = await dispatch(signupUser(null, 'google'));
    userMsg(addUser);
  };

  const register = async (ev, user) => {
    ev.preventDefault();
    if (user.email && user.password) {
      const currUser = await dispatch(loginUser(user, 'email&password'));
      userMsg(currUser);
    }
  };

  const login = () => {
    setIsLogin(!isLogin);
  };

  const googleRegister = async () => {
    const currUser = await dispatch(loginUser(null, 'google'));
    userMsg(currUser);
  };

  const restPass = async (email) => {
    const reset = await userService.restPass(email);
    reset
      ? dispatch({ type: 'USERMSG', msg: { txt: `Reset email sent!`, typeMsg: 'success' } })
      : dispatch({ type: 'USERMSG', msg: { txt: `reset email failed!`, typeMsg: 'failure' } });
  };

  const userMsg = (user) => {
    user
      ? dispatch({ type: 'USERMSG', msg: { txt: `Welcome ${user.name}`, typeMsg: '' } }) && props.history.push('/')
      : dispatch({ type: 'USERMSG', msg: { txt: `The username or password is incorrect`, typeMsg: '' } });
  };

  return (
    <div className="signup-page">
      <h4 className="login-user-btn">
        <a onClick={login}>{!isLogin ? <h4> Login </h4> : <h4> SignUp</h4>}</a>
      </h4>
      {!isLogin ? (
        <Register googleSignup={googleSignup} signup={signup} />
      ) : (
        <Login googleRegister={googleRegister} register={register} restPass={restPass} />
      )}
    </div>
  );
};
