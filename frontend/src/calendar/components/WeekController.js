import React from 'react';
import { ISO8601_week_no } from '../../shared/functions/FormatDate';

const WeekController = (props) => {
    const previous_week = () => {
        props.update(-7)
    }

    const next_week = () => {
        props.update(7)
    }

    return (
        <div className="calendar_controller">
            <button className="btn btn-primary shadow-none btn-sm" onClick={previous_week}>
                <i className="fa fa-angle-double-left"></i>
            </button>
            <span className="week_label">Week {ISO8601_week_no(props.currentUserDate)}</span>
            <button className="btn btn-primary shadow-none  btn-sm" onClick={next_week}>
                <i className="fa fa-angle-double-right"></i>
            </button>
        </div>
    )
}

export default WeekController
