import React from 'react';
import { Link } from 'react-router-dom';

import DateToday from '../../functions/Date';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import './NavBar.css';

const NavHeader = props => {
    return (
        <React.Fragment>
            <SideDrawer>
                <nav className="navSideDrawer">
                    <Link to="/">Home</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/about">About</Link>
                </nav>
            </SideDrawer>
            <MainHeader>
                <div className="headerUserContainer">
                    <div className="userNavBtn">
                        <Link to="/users"><img src={`${process.env.PUBLIC_URL}/icons/user.png`} alt="User Icon" /></Link>
                    </div>
                    <p className="headerUsername">
                        <Link to="/users">Username</Link>
                    </p>
                </div>
                <DateToday />
            </MainHeader>
        </React.Fragment>
    )
};

export default NavHeader;