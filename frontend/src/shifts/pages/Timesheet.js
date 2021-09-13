import React from 'react';

import './Timesheet.css';
import Wishlist from '../wishlist/Wishlist';
import FinishedShifts from '../timesheet/FinishedShifts';

const Timesheet = () => {

    return (
        <div className="timesheet_wrapper">
            <nav className="nav nav-pills nav-fill">
                <a className="nav-item nav-link active" href="#home" data-toggle="tab">Active</a>
                <a className="nav-item nav-link" href="#profile" data-toggle="tab">Link</a>
            </nav>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><Wishlist /></div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><FinishedShifts /></div>
            </div>
        </div>
    )
}

export default Timesheet;