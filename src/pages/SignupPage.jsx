import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoggingUser } from '../store/actions/userActions';

export const SignupPage = (props) => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');

  const handleChange = ({ target }) => {
    const value = target.type === 'number' ? +target.value : target.value;
    setUserName(value);
  };

  const signup = (ev) => {
    ev.preventDefault();
    dispatch(setLoggingUser(userName));
    props.history.push('/');
  };

  return (
    <div className="signup-page">
      <form onSubmit={signup}>
        <label htmlFor="userName">Please enter your name:</label>
        <input
          placeholder="User name"
          onChange={handleChange}
          value={userName}
          type="text"
          name="userName"
          id="userName"
        />

        <button className="simple-button" onClick={signup}>
          Sign up
        </button>
      </form>
    </div>
  );
};
