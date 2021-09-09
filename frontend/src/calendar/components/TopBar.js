import React, { useState } from 'react';
import { get_week_number } from '../../shared/functions/FormatDate';

const TopBar = () => {
    const [weekNumber, setWeekNumber] = useState(get_week_number(new Date()))
    
    return (
        <div className="calendar_controller">
            <p>{`<<`}</p>
            <p className="week_label">Week {weekNumber}</p>
            <p>{`>>`}</p>
        </div>
    )
}

export default TopBar
