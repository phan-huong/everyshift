import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import NavHeader from './shared/components/Navigation/NavHeader';
import NavFooter from './shared/components/Navigation/NavFooter';

import Users from './users/pages/Users';
import About from './places/pages/About';

const App = () => {
  return (
    <Router>
      <NavHeader />
      <main>
        <Switch>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          {/* <Redirect to="/users" /> */}
        </Switch>
      </main>
      <NavFooter />
    </Router>
  );
}

export default App;
