import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { get_local_user_data } from './shared/functions/General';
import NavHeader from './shared/components/Navigation/NavHeader';
import NavFooter from './shared/components/Navigation/NavFooter';

import Users from './users/pages/Users';
import About from './places/pages/About';
import UserProfile from './users/pages/UserProfile';
import Calendar from './calendar/pages/Calendar';


const Main = (props) => {
    const [localUser, setLocalUser] = useState(get_local_user_data())

    useEffect(() => {
        console.log("Getting user data...")
        const fetch_user_profile = async () => {
            let token = localStorage.getItem("logged_in_token");
            if (token && localUser._id) {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Bearer ${token}`);
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
        
                var status_code;
                await fetch(`http://localhost:9000/users/${localUser._id}`, requestOptions)
                .then(response => {
                    status_code = response.status;
                    return response.json()
                })
                .then(result => {
                    if (status_code === 200) {
                        // console.log(result);
                        setLocalUser(result.user_data);
                    }
                })
                .catch(error => console.log('error', error));
            }
        }

        fetch_user_profile()
    }, [])

    if (!props.authorized) return <Redirect to="/signin" />
    return (
        <>
            <NavHeader />
            <main>
                <Switch>
                    <Route exact path="/users/employees" component={Users} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/users/:id" component={UserProfile} />
                    <Route exact path="/users/create" component={UserProfile} />
                    <Route exact path="/calendar" component={Calendar} />
                </Switch>
            </main>
            <NavFooter />
        </>
    )
}

export default Main
