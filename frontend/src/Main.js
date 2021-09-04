import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NavHeader from './shared/components/Navigation/NavHeader';
import NavFooter from './shared/components/Navigation/NavFooter';

import Users from './users/pages/Users';
import About from './places/pages/About';
import UserProfile from './users/pages/UserProfile';
import SignUp from './users/pages/SignUp';
import Calendar from './calendar/components/Calendar';

const Main = (props) => {
    if (!props.authorized) return <Redirect to="/signin" />
    return (
        <>
            <NavHeader />
            <main>
                <Switch>
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/users/:id" component={UserProfile} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/calendar" component={Calendar} />
                </Switch>
            </main>
            <NavFooter />
        </>
    )
}

export default Main
