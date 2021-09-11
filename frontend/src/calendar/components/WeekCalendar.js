import React, { useState } from 'react';
import { change_current_date } from '../../shared/functions/FormatDate';

import CalendarTopBar from './CalendarTopBar';
import WeekController from './WeekController';
import CalendarTitle from './CalendarTitle';
import CalendarMainWrapper from './CalendarMainWrapper';
import './WeekCalendar.css';

const WeekCalendar = () => {
    const today = new Date();
    const [userDate, setUserDate] = useState(today);
    const DUMMY_SHIFTS = [];
    // const [currentDayOfWeek, setCurrentDayOfWeek] = useState(today.getDay());
    // const [currentDayOfMonth, setCurrentDayOfMonth] = useState(today.getDate());
    // const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    // const [currentYear, setCurrentYear] = useState(today.getFullYear());
    // const [weekNumber, setWeekNumber] = useState(get_week_number(today));

    const update_week = (days_step) => {
        let new_date = change_current_date(userDate, days_step);
        setUserDate(new_date)
    }

    return (
        <div className="calendar_page">
            <div className="calendar_wrapper">
                <CalendarTopBar currentUserDate={userDate} />
                <WeekController update={update_week} currentUserDate={userDate} />
                <div className="calender_inner_wrapper">   
                    <CalendarTitle currentUserDate={userDate} />
                    <CalendarMainWrapper shifts={DUMMY_SHIFTS} />
                </div>
            </div>
        </div>
    )
}

export default  WeekCalendar;