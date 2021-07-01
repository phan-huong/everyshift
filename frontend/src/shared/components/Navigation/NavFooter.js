import React from 'react';
import { Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import MainFooter from './MainFooter';
import './NavBar.css';

const NavFooter = props => {
    return (
        <MainFooter>      
            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Home</strong>
                </Tooltip>
            }>
                <Link to="/" data-toggle="tooltip" className="navIcon">
                    {/* <div><img src={`${process.env.PUBLIC_URL}/icons/home-b.png`} alt="Home Icon" /></div> */}
                    <div><i class="fas fa-house-user"></i></div>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Calendar</strong>
                </Tooltip>
            }>
                <Link to="/" data-toggle="tooltip" className="navIcon">
                    {/* <div><img src={`${process.env.PUBLIC_URL}/icons/calendar-b.png`} alt="Calendar Icon" /></div> */}
                    <div><i class="far fa-calendar-alt"></i></div>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Timesheet</strong>
                </Tooltip>
            }>
                <Link to="/" data-toggle="tooltip" className="navIcon">
                    {/* <div><img src={`${process.env.PUBLIC_URL}/icons/timesheet-b.png`} alt="Timesheet Icon" /></div> */}
                    <div><i class="far fa-file-alt"></i><i class="fas fa-clock clockIcon"></i></div>
                    
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Barcode</strong>
                </Tooltip>
            }>
                <Link to="/" data-toggle="tooltip" className="navIcon">
                    {/* <div><img src={`${process.env.PUBLIC_URL}/icons/barcode-b.png`} alt="Barcode Icon" /></div> */}
                    <div><i class="fas fa-qrcode"></i></div>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Days-Off</strong>
                </Tooltip>
            }>
                <Link to="/" data-toggle="tooltip" className="navIcon">
                    {/* <div><img src={`${process.env.PUBLIC_URL}/icons/day-off-b.png`} alt="Days-Off Icon" /></div> */}
                    <div><i class="fas fa-umbrella-beach"></i></div>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Notifications</strong>
                </Tooltip>
            }>
                <Link to="/" data-toggle="tooltip" className="navIcon">
                    {/* <div><img src={`${process.env.PUBLIC_URL}/icons/notifications-b.png`} alt="Notifications Icon" /></div> */}
                    <div><i class="far fa-bell"></i></div>
                </Link>
            </OverlayTrigger>
        </MainFooter>  
    )
};

export default NavFooter;