import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/scss/global.scss';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { StatisticPage } from './pages/StatisticPage';
import React from 'react';
import { AppHeader } from './cmp/AppHeader';
import { ContactDetailsPage } from './pages/ContactDetailsPage';
import { ContactEdit } from './pages/ContactEdit';
import { SignupPage } from './pages/SignupPage';

export function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <div className="app-container">
          <Switch>
            <Route component={ContactEdit} path="/contact/edit/:contactId?" />
            <Route component={ContactDetailsPage} path="/contact/:contactId" />
            <Route component={ContactPage} path="/contact" />
            <Route component={SignupPage} path="/signup" />
            <Route component={StatisticPage} path="/statistic" />
            <Route component={HomePage} path="/" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
