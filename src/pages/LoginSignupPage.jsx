import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../store/actions/userActions';
import { Register } from './Register';

import { Login } from '../cmp/Login';

export const LoginSignupPage = (props) => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const signup = async (user) => {
    const addUser = await dispatch(signupUser(user, 'email&password'));
    userMsg(addUser);
  };

  const googleSignup = async () => {
    const addUser = await dispatch(signupUser(null, 'google'));
    console.log(addUser);
    userMsg(addUser);
  };

  const login = () => {
    setIsLogin(!isLogin);
  };

  const register = async (ev, user) => {
    ev.preventDefault();
    if (user.email && user.password) {
      const currUser = await dispatch(loginUser(user, 'email&password'));
      userMsg(currUser);
    }
  };
  const googleRegister = async () => {
    const currUser = await dispatch(loginUser(null, 'google'));
    userMsg(currUser);
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
        <Login googleRegister={googleRegister} register={register} />
      )}
    </div>
  );
};
