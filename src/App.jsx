import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/scss/global.scss';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { StatisticPage } from './pages/StatisticPage';
import React from 'react';
import { AppHeader } from './cmp/AppHeader';
import { ContactDetailsPage } from './pages/ContactDetailsPage';
import { ContactEdit } from './pages/ContactEdit';
import { LoginSignupPage } from './pages/LoginSignupPage';
import { UserMsg } from './cmp/UserMsg';
import { UserMessage } from './pages/UserMessage';

export function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <div className="app-container">
          <UserMsg />
          <Switch>
            <Route component={ContactEdit} path="/contact/edit/:contactId?" />
            <Route component={ContactDetailsPage} path="/contact/:contactId" />
            <Route component={ContactPage} path="/contact" />
            <Route component={LoginSignupPage} path="/signup" />
            <Route component={StatisticPage} path="/statistic" />
            <Route component={UserMessage} path="/messages" />
            <Route component={HomePage} path="/" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
