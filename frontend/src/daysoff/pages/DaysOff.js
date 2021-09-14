import React, { useState } from 'react';
import { get_local_user_data } from '../../shared/functions/General';
import DaysOffList from '../components/DaysOffList';

import './DaysOff.css';

const Daysoff = () => {
    const filter_daysoff = () => {
        let localUser = get_local_user_data();
        let count = localUser.daysOffCount || 0;
        let list = localUser.daysOff || [];



        return { count: localUser.daysOffCount, list: localUser.daysOff };
    }
    const [daysOffList, setDaysOffList] = useState(filter_daysoff());

    return (
        <div className="daysoff_wrapper">
            <h4>Your days-off</h4>
            <DaysOffList data={daysOffList} />
            <div className="add_days_off_section">
                <button className="btn formBtn" onClick={() => { window.location.href=`/shifts/create` }}>
                    <i className="fa fa-plus mr-2"></i><span>Add days-off</span>
                </button>
            </div>
        </div>
    )
}

export default Daysoff;