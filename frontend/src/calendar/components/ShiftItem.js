import React from "react";
import { get_short_name, get_local_user_data, check_if_manager } from "../../shared/functions/General";
import { open_custom_modal } from "../../shared/components/UIElements/CustomModal";

const ShiftItem = (props) => {
    const local_userData = get_local_user_data();

    const set_properties = () => {
        let output = {
            top: 0,
            height: 0,
            classes: ''
        };

        let start_time = props.shift.start_time.split(":");
        let end_time = props.shift.end_time.split(":");
        let final_top = (parseInt(start_time[1]) / 60 + parseInt(start_time[0])) * props.item_height;
        let final_height = ((parseInt(end_time[1]) / 60 + parseInt(end_time[0])) * props.item_height) - final_top;

        let status = props.shift.status;
        let final_classes = '';
        switch (status) {
            case 'done':
                final_classes += 'bg-success text-white';
                break;
            case 'accepted':
                final_classes += 'bg-primary text-white';
                break;
            default:
                final_classes += 'bg-warning text-dark';
                break;
        }
        // console.log(props.shift.worker);
        let final_worker_name = check_if_manager(local_userData) ? 
                                get_short_name(props.shift.worker.firstName, props.shift.worker.lastName) :
                                get_short_name(local_userData.firstName, local_userData.lastName);

        output.top = final_top;
        output.height = final_height;
        output.classes = final_classes;
        output.worker_name = final_worker_name;

        return output;
    }
    const properties = set_properties();

    const item_action = () => {
        window.location.href=`/shifts/${props.shift._id}`;
        // open_custom_modal("edit_shift_modal")
    }

    return (
        <div 
            className={`shift_item rounded border border-light ${properties.classes}`}
            style={{ "top": properties.top, "height": properties.height }}
            onClick={() => { item_action() }}
        >
            <span>{properties.worker_name}</span>
        </div>
    );
}

export default ShiftItem