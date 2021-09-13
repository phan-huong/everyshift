import React, { useState, useEffect } from 'react';

import { get_local_user_data, sort_by_date } from '../shared/functions/General';
import { to_standard_date } from '../shared/functions/FormatDate';
import { get_ip, device_type } from '../shared/components/localhost';

import './UpcomingShifts.css';

const UpcomingShifts = (props) => {
    const [shiftData, setShiftData] = useState([]);
    const localUser = get_local_user_data();
    const user_id = localUser._id;

    useEffect(() => {
        const fetch_shift_today = async () => {
            let token = localStorage.getItem("logged_in_token");
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            var status_code;
            await fetch(`http://${get_ip(device_type)}:9000/shifts/${user_id}`, requestOptions)
            .then(response => {
                status_code = response.status;
                return response.json()
            })
            .then(result => {
                if (status_code === 200) {
                    setShiftData(result.shifts);
                }
            })
            .catch(error => console.log('error', error));
        }
        fetch_shift_today();

    }, [])

    const display_shifts = () => {
        const sorted_shift_data = sort_by_date(shiftData);
        let sorted_shift_accepted = [];

        for (const sorted_shift of sorted_shift_data) {
            if (sorted_shift.status === 'accepted') {
                sorted_shift_accepted.push(sorted_shift);
            }
        }
        
        let shift_id, shift_date, shift_job, shift_start, shift_end;
        let display_shifts = [];

        const today = new Date();

        let upcoming_shifts = [];
        for (var i=0; i<sorted_shift_accepted.length; i++) {
            let day_previous;
            let day_next = new Date(sorted_shift_accepted[i].date); 
            if (day_next === today) {
                if (i === (sorted_shift_accepted.length-1)) {
                    upcoming_shifts = [];
                }
                if (i<(sorted_shift_accepted.length-1)) {
                    let day_after = sorted_shift_accepted[i+1];
                    if (day_after !== today) {
                        if (((i+6)<sorted_shift_accepted.length) || ((i+6)===sorted_shift_accepted.length)){
                            for (var n=i+1; n<(i+6); n++) {
                                upcoming_shifts.push(sorted_shift_accepted[n]);
                            }
                        }
                        if ((i+6)>sorted_shift_accepted.length) {
                            for (var n=i+1; n<sorted_shift_accepted.length; n++) {
                                upcoming_shifts.push(sorted_shift_accepted[n]);
                            }
                        }
                    } else if (day_after === today) {
                        if (((i+7)<sorted_shift_accepted.length) || ((i+7)===sorted_shift_accepted.length)){
                            for (var n=i+2; n<(i+7); n++) {
                                upcoming_shifts.push(sorted_shift_accepted[n]);
                            }
                        }
                        if ((i+7)>sorted_shift_accepted.length) {
                            for (var n=i+2; n<sorted_shift_accepted.length; n++) {
                                upcoming_shifts.push(sorted_shift_accepted[n]);
                            }
                        }
                    }
                }
            } else if (day_next !== today) {
                if (i === 0) {              
                    if (day_next > today) {
                        while (i<5) {
                            upcoming_shifts.push(sorted_shift_accepted[i]);
                        }
                    }
                }
                if (i > 0) {
                    day_previous = new Date(sorted_shift_accepted[i-1].date); 
                    if ((day_previous < today) && (day_next > today)) {
                        if (((i+5)<sorted_shift_accepted.length) || ((i+5)===sorted_shift_accepted.length)){
                            for (var n=i; n<(i+5); n++) {
                                upcoming_shifts.push(sorted_shift_accepted[n]);
                            }
                        }
                        if ((i+5)>sorted_shift_accepted.length) {
                            for (var n=i; n<sorted_shift_accepted.length; n++) {
                                upcoming_shifts.push(sorted_shift_accepted[n]);
                            }
                        }
                    }
                }
            }
        } if (upcoming_shifts.length > 0) {
            for (const shift of upcoming_shifts) {
                shift_id = shift._id;
                shift_date = to_standard_date(shift.date);
                shift_job = shift.job;
                shift_start = shift.start_time;
                shift_end = shift.end_time;
                let el = <div className="upcoming_shift" key={shift_id}>
                        <p className="upcoming_shift_date">{shift_date}</p>
                        <div className="upcoming_shift_info">
                            <p>Your job: {shift_job}<br/>
                            Starts at: {shift_start} &nbsp; &nbsp; / &nbsp; &nbsp; ends at: {shift_end}</p>
                        </div>
                    </div>
                display_shifts.push(el);
            } return display_shifts;
        } else if (upcoming_shifts.length === 0) {
            return <div className="no_upcoming_shifts">
                <div className="no_upcoming_shifts_text">
                    <p>You don't have any shifts awaiting <i className="far fa-grin-beam-sweat"></i></p>
                    <p>Apply for work by adding shifts to wishlist</p>
                </div>
                <button className="add_to_wishlist_btn btn mr-1 formBtn" onClick={() => {window.location.href="/shifts/create"}}>
                    <i className="fa fa-plus mr-4"></i><span>Add shifts to wishlist</span>
                </button>
            </div>
        }     
    }
    
    return <div className="upcoming_shifts_wrapper">  
        <h5>Upcoming shifts</h5>
        <div className="upcoming_shifts_container">
            {display_shifts()}
        </div>   
    </div>
}

export default UpcomingShifts;