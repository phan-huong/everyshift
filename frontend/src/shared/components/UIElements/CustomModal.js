import React from "react";
import './CustomModal.css';

function close_custom_modal(modal_id) {
    if (document.getElementById(modal_id).classList.contains("d-flex")) {
        document.getElementById(modal_id).classList.remove("d-flex");
    }
}

function open_custom_modal(modal_id) {
    if (!document.getElementById(modal_id).classList.contains("d-flex")) {
        document.getElementById(modal_id).classList.add("d-flex");
    }
}

const CustomModal = (props) => {
    return (
        <div id={props.id} className="custom_modal">
            <div className="custom_modal_wrapper rounded">
                <div className="custom_modal_header">
                    <div className="title"><i className="fa fa-pencil"></i>{props.title}</div>
                    <div className="close_btn">
                        <button onClick={() => { close_custom_modal(props.id) }}><i className="fa fa-times"></i></button>
                    </div>
                </div>
                <div className="custom_modal_content">
                    <div className="main_content">
                        {props.children}
                    </div>
                </div>
                <div className="custom_modal_footer">
                    <div className="status"></div>
                    <div className="buttons">
                        <button className="btn btn-success" onClick={() => { close_custom_modal(props.id) }}>Apply</button>
                        { props.has_close_btn ? <button className="btn btn-secondary" onClick={() => { close_custom_modal(props.id) }}>Close</button> : <></> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export {
    CustomModal,
    close_custom_modal,
    open_custom_modal
}