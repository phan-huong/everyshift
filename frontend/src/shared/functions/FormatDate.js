// import React from "react";

function to_raw_date(date_in) {
    let date_out = '';
    if (date_in) {
        let new_date = new Date(date_in);
        let new_year = new_date.getFullYear();
        let new_month = new_date.getMonth() < 9 ? "0" + (new_date.getMonth() + 1) : new_date.getMonth() + 1;
        let new_day = new_date.getDate() < 10 ? "0" + (new_date.getDate() + 1) : new_date.getDate() + 1;
        date_out = `${new_year}-${new_month}-${new_day}`;
    }
    return date_out;
}

export {
    to_raw_date
}