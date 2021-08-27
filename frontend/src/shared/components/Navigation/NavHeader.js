import React from 'react'
import { Link } from 'react-router-dom';

import DateToday from '../../functions/Date';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import './NavBar.css';

const NavHeader = props => {
    const openDrawer = () => {
        document.getElementById("sideDrawer").setAttribute("class", "drawerOpen");
    }
    return (
        <React.Fragment>
            <MainHeader>
                <div className="headerUserContainer">
                    <div>
                        <Link className="userNavBtn" onClick={openDrawer} to="#"><img src={`${process.env.PUBLIC_URL}/icons/user.png`} alt="User Icon" /></Link>
                    </div>
                    <p className="headerUsername">
                        <Link to="/users">Username</Link>
                    </p>
                </div>
                <DateToday />
            </MainHeader>
            <SideDrawer />
        </React.Fragment>
    )
};

export default NavHeader;