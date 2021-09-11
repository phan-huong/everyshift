import React, { useState, useEffect } from 'react';
import { get_ip, device_type } from '../../shared/components/localhost';
import { change_current_date } from '../../shared/functions/FormatDate';

import CalendarTopBar from './CalendarTopBar';
import WeekController from './WeekController';
import CalendarTitle from './CalendarTitle';
import CalendarMainWrapper from './CalendarMainWrapper';
import './WeekCalendar.css';

const WeekCalendar = () => {
    const today = new Date();
    const [userDate, setUserDate] = useState(today);
    const [userShifts, setUserShifts] = useState([]);
    // const [currentDayOfWeek, setCurrentDayOfWeek] = useState(today.getDay());
    // const [currentDayOfMonth, setCurrentDayOfMonth] = useState(today.getDate());
    // const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    // const [currentYear, setCurrentYear] = useState(today.getFullYear());
    // const [weekNumber, setWeekNumber] = useState(get_week_number(today));

    const update_week = (days_step) => {
        let new_date = change_current_date(userDate, days_step);
        setUserDate(new_date)
    }

    useEffect(() => {
        const fetch_shifts = async (url, request_options) => {
            var status_code;
            await fetch(url, request_options)
            .then(response => {
                status_code = response.status;
                return response.json()
            })
            .then(result => {
                if (status_code === 200) {
                    // console.log(result);
                    setUserShifts(result.shifts);
                }
            })
            .catch(error => console.log('error', error));
        }

        let token = localStorage.getItem("logged_in_token");
        let userData = JSON.parse(localStorage.getItem("userData"));
        if (token && userData) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            
            if (userData.role == 'manager') {
                fetch_shifts(`http://${get_ip(device_type)}:9000/shifts`, requestOptions)
            } else {
                fetch_shifts(`http://${get_ip(device_type)}:9000/shifts/${userData._id}`, requestOptions)
            }
        }
    }, [userDate])

    return (
        <div className="calendar_page">
            <div className="calendar_wrapper">
                <CalendarTopBar currentUserDate={userDate} />
                <WeekController update={update_week} currentUserDate={userDate} />
                <div className="calender_inner_wrapper">   
                    <CalendarTitle currentUserDate={userDate} />
                    <CalendarMainWrapper currentUserDate={userDate} shifts={userShifts} />
                </div>
            </div>
        </div>
    )
}

export default  WeekCalendar;