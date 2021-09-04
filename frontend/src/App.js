import React, {useState, useEffect, useCallback, useContext} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Main from './shared/components/Main';
import SignIn from './users/pages/SignIn';

const App = () => {
  return (
      <Router>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/" component={() => <Main authorized={localStorage.getItem('logged_in_token') ? true : false} />} />
          </Switch>
      </Router>
  );
};

export default App;
