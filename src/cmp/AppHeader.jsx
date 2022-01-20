import React from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';

import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/actions/userActions';

export const AppHeader = () => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className="app-header">
      <Link className="simple-button" to="/">
        Mister-BITCoin
      </Link>
      <div className="links">
        <NavLink className="simple-button" exact to="/">
          Home
        </NavLink>
        <NavLink className="simple-button" to="/contact">
          Contacts
        </NavLink>
        <NavLink className="simple-button" to="/statistic">
          Chart
        </NavLink>
        <NavLink className="simple-button" to="/signup" onClick={onLogOut}>
          <LogoutSharpIcon className="log-out simple-button"></LogoutSharpIcon>
        </NavLink>
      </div>
    </header>
  );
};

// export const AppHeader = withRouter(_AppHeader);
