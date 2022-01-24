import React from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';

import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/actions/userActions';

import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';

export const AppHeader = () => {
  const { loggedInUser } = useSelector((state) => state.userModule);

  const dispatch = useDispatch();

  const UnreadMessages = () => {
    if (loggedInUser) {
      let messages = loggedInUser.messages.reduce((acc, m) => (!m.isOpening ? ++acc : acc), 0);
      if (!messages) messages = ' ';
      return messages;
    }
  };

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
          <HomeIcon />
        </NavLink>
        <NavLink className="simple-button" to="/contact">
          <PeopleIcon />
        </NavLink>
        <NavLink className="simple-button" to="/statistic">
          <BarChartIcon />
        </NavLink>
        <NavLink className="simple-button message-header" to="/messages">
          <p>{UnreadMessages()}</p>
          <MessageIcon />
        </NavLink>
        <NavLink className="simple-button" to="/signup" onClick={onLogOut}>
          <LogoutSharpIcon className="log-out simple-button"></LogoutSharpIcon>
        </NavLink>
      </div>
    </header>
  );
};

// export const AppHeader = withRouter(_AppHeader);
