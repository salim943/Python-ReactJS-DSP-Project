// MainApp.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App1 from './YourComponent';
import App2 from './YourComponent';

const MainApp = () => {
  return (
    <Router>
      <Switch>
        <Route path="/app1" component={YourComponent} />
        <Route path="/app2" component={YourComponent} />
        {/* Add more routes for other applications as needed */}
      </Switch>
    </Router>
  );
};

export default MainApp;
