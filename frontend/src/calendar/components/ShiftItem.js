import React from "react";

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

        output.top = final_top;
        output.height = final_height;
        output.classes = final_classes;

        return output;
    }
    const properties = set_properties();

    return (
        <div 
            className={`shift_item rounded border border-light ${properties.classes}`}
            style={{ "top": properties.top, "height": properties.height }}
        >
            Test
        </div>
    );
}

export default ShiftItem