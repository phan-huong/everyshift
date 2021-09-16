import React, { useState, useEffect, useLayoutEffect } from 'react';
import QRCode from 'qrcode';
import { get_local_user_data, get_local_user_token, update_local_user_data } from '../../shared/functions/General';
import { CustomModal, open_custom_modal, close_custom_modal } from '../../shared/components/UIElements/CustomModal';

import './QRCodePage.css';

const QRCodePage = () => {
    const [qrCodeURL, setqrCodeURL] = useState();
    const userData = get_local_user_data();

    const modal_action = () => {

    }

    useEffect(() => {
        const get_qr_code = async () => {
            let token = get_local_user_token();
            if (token) {
                // https://www.npmjs.com/package/qrcode
                try {
                    const image_data = await QRCode.toDataURL(userData._id, {version: 10});
                    // console.log(image_data)
                    setqrCodeURL(image_data);
                } catch (error) {
                    console.log(error)
                }
            }
        }
        get_qr_code();
    }, [])

    return (
        <div className="qrcode_page">
            <div className="qrcode_wrapper">
                <div className="title_section">Your QR Code</div>
                
                <div className="main_content">
                    {
                        qrCodeURL ? <img className="border p-2" src={qrCodeURL} /> : <div className="spinner-border text-primary"></div>
                    }
                </div>
                
                <div className="buttons_section">
                    {
                        userData.role === 'manager' ? 
                        <button className="btn formBtn" onClick={() => { modal_action() }}>
                            <i className="fa fa-qrcode mr-2"></i><span>Scan QR Code</span>
                        </button> : <span className="text-info font-italic">Let QR Code scanned to check-in to your shift.</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default QRCodePage;