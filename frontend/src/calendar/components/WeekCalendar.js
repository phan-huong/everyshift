import React, { useState, useEffect } from 'react';
import { get_ip, device_type } from '../../shared/components/localhost';
import { change_current_date } from '../../shared/functions/FormatDate';

import CalendarTopBar from './CalendarTopBar';
import WeekController from './WeekController';
import CalendarTitle from './CalendarTitle';
import CalendarMainWrapper from './CalendarMainWrapper';
import { CustomModal } from '../../shared/components/UIElements/CustomModal';
import './WeekCalendar.css';

const WeekCalendar = () => {
    const today = new Date();
    const [userDate, setUserDate] = useState(today);
    const [userShifts, setUserShifts] = useState([]);

    const update_week = (days_step) => {
        let new_date = change_current_date(userDate, days_step);
        setUserDate(new_date)
    }

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

    useEffect(() => {
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
            <CustomModal id="edit_shift_modal" title="Edit shift" has_close_btn={false}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   

Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.   

At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            </CustomModal>
        </div>
    )
}

export default  WeekCalendar;