import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import DateToday from '../../functions/Date';
import MainHeader from './MainHeader';
import SideDrawer from './SideDrawer';
import './NavBar.css';

const NavHeader = props => {
    const [username, setUsername] = useState("Username");
    const [userImageURL, setUserImageURL] = useState(`${process.env.PUBLIC_URL}/icons/user.png`);
    const sideDrawerOpenClass = "drawerOpen";

    const openDrawer = (event) => {
        event.preventDefault();
        document.getElementById("sideDrawer").classList.add(sideDrawerOpenClass);
    }

    useEffect(() => {
        if (localStorage.getItem("userData")) {
            let userData = JSON.parse(localStorage.getItem("userData"));
            setUsername(userData.name ? userData.name : `${userData.firstName} ${userData.lastName}`);
            setUserImageURL(userData.image);
        }
    }, [username, userImageURL])
    
    return (
        <React.Fragment>
            <MainHeader>
                <div className="headerUserContainer">
                    <div>
                        <Link id="userNavBtn" className="userNavBtn" onClick={(e) => openDrawer(e)} to="#"><img src={userImageURL} alt="User Icon" /></Link>
                    </div>
                    <p className="headerUsername">{username}</p>
                </div>
                {/* <DateToday /> */}
            </MainHeader>
            <SideDrawer />
        </React.Fragment>
    )
};

export default NavHeader;