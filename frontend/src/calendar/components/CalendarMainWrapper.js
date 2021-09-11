import React from "react";
import { CALENDAR, get_time_of_day_label } from "../../shared/functions/FormatDate";
import HourLine from "./HourLine";

const CalendarMainWrapper = (props) => {
    const font_height = 16 * 0.85 / 2;
    const item_height = CALENDAR.height_rate * 60;
    const calendar_height = item_height * 24;
    const time_of_day = get_time_of_day_label(item_height, true, item_height / 2 - font_height);

    return (
        <div className="calendar_main_wrapper">
            <div className="time_of_day" style={{ "height": `${calendar_height}px` }}>
                <HourLine item_height={item_height} />
                {
                    time_of_day.map((time, index) => {
                        return (
                            <div className="single_time" style={{ "top": time.top }} key={`time_label_${index}`}>
                                {time.label}
                            </div>
                        )
                    })
                }
            </div>
            
            <div className="days_of_week">
                <HourLine item_height={item_height} />
                <div className="days_of_week_content">
                    {
                        CALENDAR.days_super_short.map((day, index) => {
                            return (
                                <div className="single_day_content" key={`day_content_${index}`}></div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CalendarMainWrapper;