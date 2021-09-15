import React from 'react';
import DaysOffList from '../components/DaysOffList';

import './DaysOff.css';

const Daysoff = () => {
    return (
        <div className="daysoff_page">
            <div className="daysoff_wrapper">
                <div className="title_section">Your days-off</div>
                
                <div className="main_content">
                    <DaysOffList />
                </div>
                
                <div className="add_days_off_section">
                    <button className="btn formBtn" onClick={() => { window.location.href=`/shifts/create` }}>
                        <i className="fa fa-plus mr-2"></i><span>Add days-off</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Daysoff;