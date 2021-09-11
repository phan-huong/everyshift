import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './SideDrawer.css';
import NavIcon from '../UIElements/NavIcon';

const SideDrawer = () => {
    let history = useHistory();
    const sideDrawerOpenClass = "drawerOpen";
    const [userID, setUserID] = useState();
    const [userRole, setUserRole] = useState("employee");

    const closeDrawer = () => {
        document.getElementById("sideDrawer").classList.remove(sideDrawerOpenClass);
    }

    const user_logout = () => {
        localStorage.removeItem('logged_in_token');
        localStorage.removeItem('userData');
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
            <div className="sideDrawerWrapper">
                <Link to={`/users/${userID}`} onClick={() => { closeDrawer(); window.location.href=`/users/${userID}`; }}>
                    <NavIcon icon={<i className="fas fa-id-badge"></i>} text={"User Profile"}/>
                </Link>
                { userRole === "manager" ? <Link to="/users/create" onClick={() => { closeDrawer(); window.location.href="/users/create"; }}>
                    <NavIcon icon={<i className="fas fa-user-plus"></i>} text={"Create User"}/></Link> : <></> }
                { userRole === "manager" ? <Link to="/users/employees" onClick={closeDrawer}>
                    <NavIcon icon={<i className="fas fa-users"></i>} text={"Manage Employees"}/></Link> : <></> }
                <Link to="/" onClick={closeDrawer}>
                    <NavIcon icon={<i className="fas fa-cogs"></i>} text={"Settings"}/>
                </Link>
                <Link to="/about" onClick={closeDrawer}>
                    <NavIcon icon={<i className="fas fa-info-circle"></i>} text={"About"}/>
                </Link>
                <Link to="/signin" onClick={() => { closeDrawer(); user_logout(); }}>
                    <NavIcon icon={<i className="fas fa-sign-out-alt"></i>} text={"Sign out"}/>
                </Link>
                {/* <Link onClick={closeDrawer} to="#">Close</Link> */}
            </div>
        </nav>
    </aside>
};

export default SideDrawer;