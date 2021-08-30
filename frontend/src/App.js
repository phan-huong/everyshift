import React, {useState, useCallback, useContext} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import NavHeader from './shared/components/Navigation/NavHeader';
import NavFooter from './shared/components/Navigation/NavFooter';

import Users from './users/pages/Users';
import About from './places/pages/About';
import UserPlaces from './places/pages/UserPlaces';
import SignIn from './users/pages/SignIn';
import SignUp from './users/pages/SignUp';
import { AuthContext } from './shared/context/auth-context';
import Calendar from './calendar/components/Calendar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const auth = useContext(AuthContext);

  if (!isLoggedIn) {
    document.body.classList.add("background-dark")
  } else document.body.classList.remove("background-dark");

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        {!auth.isLoggedIn && (
          <React.Fragment>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Redirect to="/signin" />
          </React.Fragment>
        )}
        {auth.isLoggedIn && (
          <React.Fragment>
            <NavHeader />
            <main>
              <Switch>
                <Route exact path="/users">
                  <Users />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
                <Route path="/:userId/places" exact>
                  <UserPlaces />
                </Route>
                <Route path="/signup">
                  <SignUp />
                </Route>
                <Route path="/calendar">
                  <Calendar />
                </Route>
              </Switch>
            </main>
            <NavFooter />
          </React.Fragment>
        )}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
