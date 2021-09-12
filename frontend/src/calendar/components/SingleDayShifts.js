import React from "react";
import { correct_day_of_week, compare_date_standard } from "../../shared/functions/FormatDate";
import ShiftItem from './ShiftItem';

const SingleDayShifts = (props) => {
    // console.log(`============ Day ${props.current_day} ============`);
    const filter_shifts = () => {
        let final_shifts = [];

        for (const shift of props.shifts) {
            let shift_date = new Date(shift.date);
            // console.log(`Shift date: ${shift_date}`);
            for (const week_date of props.current_week) {
                // console.log(`Week date: ${week_date}`);
                let day_of_week = correct_day_of_week(week_date.getDay());

                if (compare_date_standard(shift_date, week_date) && day_of_week == props.current_day) {
                    // console.log(`Week date: ${week_date}`);
                    final_shifts.push(shift);
                    break;
                }
            }
        }

        // console.log(final_shifts);

        return final_shifts;
    }

    const shifts = filter_shifts();
    return (
        <>
            {
                shifts.length > 0 ? 
                shifts.map((shift, index) => {
                    // console.log(shift)
                    return (
                        <ShiftItem key={`shift_item_${index}`} shift={shift} item_height={props.item_height} />
                    )
                })
                : <></>
            }
        </>
    )
}

export default SingleDayShifts;