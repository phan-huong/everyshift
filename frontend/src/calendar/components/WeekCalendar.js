import React from 'react';
import './WeekCalendar.css';

const WeekCalendar = () => {

    const days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const days_short = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const months_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const week_calendar = document.getElementById("week_calendar");

    // Day labels
    const create_day_labels = () => {

        const day_labels = [];

        for (var i=0; i<days_short.length; i++) {
            var new_day_label = React.createElement('p', {className: 'day_of_week_label', id: 'day_label_'+i}, days_short[i]);
            day_labels.push(new_day_label);
        }
        return day_labels;
    }

    return (
        <div className="calendar_page">
            <h5 className="month_label">August 2021</h5>
            <div className="calendar_wrapper">
                <div className="calendar_controller">
                    <p>{`<<`}</p>
                    <p className="week_label">Week 37</p>
                    <p>{`>>`}</p>
                </div>
                <div className="calender_inner_wrapper">
                    <div className="hours_of_day">
                        {}
                    </div>
                    <div className="days_of_week_label" id="week_calendar">
                        {create_day_labels()}
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default  WeekCalendar;