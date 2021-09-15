import React, { useState } from "react";
import { sort_by_date_from_db } from '../../shared/functions/General';
import { to_standard_date, get_this_year_only } from "../../shared/functions/FormatDate";

const DaysOffList = (props) => {
    const filter_daysoff = () => {
        let userData = props.userData;
        let count = userData.daysOffCount || 24;
        let list = userData.daysOff || [];
        let sorted_list = sort_by_date_from_db(list);

        function get_years(dates_list) {
            let years = [];
            let tempo_year = 0;
            for (const date_str of dates_list) {
                let new_date = new Date(date_str);
                let new_year = new_date.getFullYear();
                if (!years.includes(new_year)) {
                    years.push(new_year)
                }
            }

            // console.log(years);
            return years;
        }

        return { 
            count: count, 
            years: get_years(sorted_list), 
            list: sorted_list
        };
    }
    // const [daysOffData, setDaysOffData] = useState(filter_daysoff());
    const daysOffData = filter_daysoff();

    return (
        <>
            <ul id="year_accordion" className="year_list list-group border">
                {
                    daysOffData.years.length > 0 ? 
                    daysOffData.years.map((year, y_index) => {
                        return(
                            <li className="year_item" key={`year_${y_index}`}>
                                <a href={`#year_item_${y_index}`} 
                                    className="year_item_link list-group-item list-group-item-action list-group-item-primary" 
                                    data-toggle="collapse"
                                >
                                    <span className="title">{`Days-off in ${year}`}</span>
                                    <i className="icon fa fa-chevron-down arrow_rotate"></i>
                                </a>
                                <div id={`year_item_${y_index}`} className={`collapse ${get_this_year_only() === year ? 'show' : ''}`} data-parent="#year_accordion">
                                    <div className="card-body">
                                        { 
                                            daysOffData.list.length > 0 ?
                                            daysOffData.list.map((daysoff, d_index) => {
                                                let new_date = new Date(daysoff);
                                                let pretty_date = to_standard_date(daysoff);
                                                let base_year = new_date.getFullYear();
                                                // let base_month = new_date.getMonth();
                                                // let base_date = new_date.getDate()

                                                if (base_year !== year) return null;

                                                return (
                                                    <div className="input-group mb-1" key={`daysoff_group_${d_index}`}>
                                                        <input type="text" className="form-control shadow-none" value={pretty_date} readOnly={true} />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-danger shadow-none" type="button" id="button-addon2"><i className="fa fa-times" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                )
                                            }) : null
                                        }
                                    </div>
                                </div>
                            </li>
                        )
                    }) : null
                }
            </ul>
        </>
    )
}

export default DaysOffList;