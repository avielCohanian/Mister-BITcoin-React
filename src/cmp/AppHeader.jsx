import React from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';

function _AppHeader() {
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
      </div>
    </header>
  );
}

export const AppHeader = withRouter(_AppHeader);
