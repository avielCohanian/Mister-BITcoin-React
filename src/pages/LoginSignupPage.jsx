import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../store/actions/userActions';
import { Register } from './Register';

import { Login } from '../cmp/Login';

export const LoginSignupPage = (props) => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);

  const signup = async (user) => {
    const addUser = await dispatch(signupUser(user));
    if (!addUser) return;
    props.history.push('/');
  };
  const login = () => {
    setIsLogin(!isLogin);
  };

  const register = async (ev, user) => {
    ev.preventDefault();
    if (user.name && user.password) {
      const currUser = await dispatch(loginUser(user));
      currUser
        ? dispatch({ type: 'USERMSG', msg: { txt: `Welcome ${currUser.name}`, typeMsg: '' } }) &&
          props.history.push('/')
        : dispatch({ type: 'USERMSG', msg: { txt: `The username or password is incorrect`, typeMsg: '' } });
    }
  };
  return (
    <div className="signup-page">
      <h4 className="login-user-btn">
        <a onClick={login}>{!isLogin ? <h4> Login </h4> : <h4> SignUp</h4>}</a>
      </h4>

      {!isLogin ? <Register signup={signup} login={login}></Register> : <Login register={register} />}
    </div>
  );
};
