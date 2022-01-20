import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggingUser } from '../store/actions/userActions';
import { Register } from './Register';

export const LoginSignupPage = (props) => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');

  const handleChange = ({ target }) => {
    const value = target.type === 'number' ? +target.value : target.value;
    setUserName(value);
  };

  const signup = (user) => {
    dispatch(setLoggingUser(user));
    props.history.push('/');
  };

  return (
    <div className="signup-page">
      <Register signup={signup}></Register>
    </div>
  );
};
