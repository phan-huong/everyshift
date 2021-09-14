import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import DateToday from '../../functions/Date';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import './NavBar.css';

const NavHeader = props => {
    const [username, setUsername] = useState("Username");
    // const [userImageURL, setUserImageURL] = useState(`${process.env.PUBLIC_URL}/icons/user.png`);
    const [openDrawerState, setOpenDrawerState] = useState(false);

    const openDrawer = (event) => {
        event.preventDefault();
        setOpenDrawerState(!openDrawerState)
        const sideDrawerOpenClass = "drawerOpen";

        if (openDrawerState) {
            document.getElementById("sideDrawer").classList.remove(sideDrawerOpenClass);
        } else {
            document.getElementById("sideDrawer").classList.add(sideDrawerOpenClass);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("userData")) {
            let userData = JSON.parse(localStorage.getItem("userData"));
            setUsername(userData.name ? userData.name : `${userData.firstName} ${userData.lastName}`);
            // setUserImageURL(userData.image);
        }
    }, [])
    
    return (
        <header>
            <MainHeader>
                <div className="headerUserContainer">
                    <div>
                        <Link id="userNavBtn" className="userNavBtn" onClick={(e) => openDrawer(e)} to="#">
                            {/* <img src={userImageURL} alt="User Icon" /> */}
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </Link>
                    </div>
                    <p className="headerUsername">{username}</p>
                </div>
                <DateToday />
            </MainHeader>
            <SideDrawer />
        </header>
    )
};

export default NavHeader;