import React, { useState } from 'react';

import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';

export const Login = ({ register }) => {
  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    setUser({ ...user, [field]: value });
  };

  return (
    <form onSubmit={(ev) => register(ev, user)} className="form-login">
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
      <button className="simple-button">Login</button>
    </form>
  );
};
