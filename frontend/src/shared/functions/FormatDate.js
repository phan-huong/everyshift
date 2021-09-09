// Convert a date to format YYYY-MM-DD
function to_raw_date(date_in) {
    let date_out = '';
    if (date_in) {
        let new_date = new Date(date_in);
        let new_year = new_date.getFullYear();
        let new_month = new_date.getMonth() < 9 ? "0" + (new_date.getMonth() + 1) : new_date.getMonth() + 1;
        let new_day = new_date.getDate() < 10 ? "0" + new_date.getDate() : new_date.getDate();
        date_out = `${new_year}-${new_month}-${new_day}`;
    }
    return date_out;
}

// Function to get a week number
function get_week_number(date) {
    let first_day = new Date(date.getFullYear(), 0, 1);
    let week_number = Math.ceil( (((date.getTime() - first_day.getTime()) / 86400000) + first_day.getDay() + 1) / 7 );
    return week_number.toString();
}

export {
    to_raw_date, get_week_number
}