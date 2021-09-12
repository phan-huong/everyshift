import React from "react";
import { get_short_name } from "../../shared/functions/General";
import { open_custom_modal } from "../../shared/components/UIElements/CustomModal";

const ShiftItem = (props) => {
    const set_properties = () => {
        let output = {
            top: 0,
            height: 0,
            classes: ''
        };

        let start_time = props.shift.start_time.split(":");
        let end_time = props.shift.end_time.split(":");
        let final_top = parseInt(start_time[0]) * props.item_height + parseInt(start_time[1]);
        let final_height = (parseInt(end_time[0]) * props.item_height + parseInt(end_time[1])) - final_top;

        let status = props.shift.status;
        let final_classes = '';
        switch (status) {
            case 'done':
                final_classes += 'bg-success text-white';
                break;
            case 'accepted':
                final_classes += 'bg-info text-white';
                break;
            default:
                final_classes += 'bg-warning text-dark';
                break;
        }

        let final_worker_name = get_short_name(props.shift.worker.firstName, props.shift.worker.lastName)

        output.top = final_top;
        output.height = final_height;
        output.classes = final_classes;
        output.worker_name = final_worker_name;

        return output;
    }
    const properties = set_properties();

    return (
        <div 
            className={`shift_item rounded border border-light ${properties.classes}`}
            style={{ "top": properties.top, "height": properties.height }}
            onClick={() => { open_custom_modal("edit_shift_modal") }}
        >
            <span>{properties.worker_name}</span>
        </div>
    );
}

export default ShiftItem