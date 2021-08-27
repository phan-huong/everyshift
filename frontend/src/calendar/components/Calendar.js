import React, { useState } from 'react';
import Calendar from 'react-calendar';

import './Calendar.css';
import 'react-calendar/dist/Calendar.css';

const ShiftCalendar = () => {
    const [value, onChange] = useState(new Date());

    return (
      <div>
        <h5 className="calendar_title">Current plan</h5>
        <Calendar
          onChange={onChange}
          value={value}
        />
        <div className="todayShift">
            <p>Today: No shifts await <i className="far fa-smile"></i></p>
        </div>
        <div className="todayShift">
            <p>23-08-2021</p>
            <p>Front-desk from 08:00 till 15:00</p>
        </div>
        {/* <table>
            <tr>
                <td style="background-color:#bbbbbb"></td>
                <td>Past shifts</td>
                <td></td>
                <td style="background-color:#bbbbbb"></td>
                <td>Upcoming shifts</td>
            </tr>
            <tr>
                <td style="background-color:#bbbbbb"></td>
                <td>Past shifts</td>
                <td></td>
                <td style="background-color:#bbbbbb"></td>
                <td>Upcoming shifts</td>
            </tr>
        </table> */}
      </div>
    );
  }

export default ShiftCalendar;