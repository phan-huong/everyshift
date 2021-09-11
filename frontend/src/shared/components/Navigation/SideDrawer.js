import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './SideDrawer.css';

const SideDrawer = () => {
    let history = useHistory();
    const sideDrawerOpenClass = "drawerOpen";
    const [userID, setUserID] = useState();
    const [userRole, setUserRole] = useState("employee");

    const closeDrawer = () => {
        document.getElementById("sideDrawer").classList.remove(sideDrawerOpenClass);
    }

    const user_logout = () => {
        // localStorage.removeItem('logged_in_token');
        // localStorage.removeItem('userData');
        localStorage.clear();
        history.push('/signin');
    }

    useEffect(() => {
        window.addEventListener('mouseup',function(event){
            var sideDrawer = document.getElementById('sideDrawer');
            if (sideDrawer && event.target !== sideDrawer && event.target.parentNode !== sideDrawer){
                sideDrawer.classList.remove(sideDrawerOpenClass);
            }
        });

        if (localStorage.getItem('userData')) {
            let userData = JSON.parse(localStorage.getItem('userData'));
            setUserID(userData._id);
            setUserRole(userData.role);
        }
    }, [userID, userRole])

    return <aside>
        <nav id="sideDrawer">
            <Link to={`/users/${userID}`} onClick={() => { closeDrawer(); window.location.href=`/users/${userID}`; }}>User Profile</Link>
            { userRole === "manager" ? <Link to="/users/create" onClick={() => { closeDrawer(); window.location.href="/users/create"; }}>Create user</Link> : <></> }
            { userRole === "manager" ? <Link to="/users/employees" onClick={closeDrawer}>Manage employees</Link> : <></> }
            <Link to="/" onClick={closeDrawer}>Settings</Link>
            <Link to="/about" onClick={closeDrawer}>About</Link>
            <Link to="/signin" onClick={() => { closeDrawer(); user_logout(); }}>Sign out</Link>
            {/* <Link onClick={closeDrawer} to="#">Close</Link> */}
        </nav>
    </aside>
};

export default SideDrawer;