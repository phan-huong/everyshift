import React from 'react';
import { Link } from 'react-router-dom';

import './SideDrawer.css';

const SideDrawer = props => {
    const closeDrawer = () => {
        document.getElementById("sideDrawer").setAttribute("class", "");
    }

    const user_logout = () => {
        localStorage.removeItem('logged_in_token');
    }
    return <aside>
        <nav id="sideDrawer">
            <Link to="/" onClick={closeDrawer}>User Profile</Link>
            <Link to="/" onClick={closeDrawer}>Settings</Link>
            <Link to="/about" onClick={closeDrawer}>About</Link>
            <Link to="/signin" onClick={() => {user_logout(); closeDrawer();}}>Sign out</Link>
            <Link onClick={closeDrawer} to="#">Close</Link>
        </nav>
    </aside>
};

export default SideDrawer;