import React from 'react';
import { Link } from 'react-router-dom';

// import "bootstrap/dist/css/bootstrap.css";
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
                    <div><i className="fas fa-house-user"></i></div>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Calendar</strong>
                </Tooltip>
            }>
                <Link to="/calendar" data-toggle="tooltip" className="navIcon">
                    <div><i className="far fa-calendar-alt"></i></div>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Timesheet</strong>
                </Tooltip>
            }>
                <Link to="/timesheet" data-toggle="tooltip" className="navIcon">
                    <div><i className="far fa-file-alt"></i><i className="fas fa-clock clockIcon"></i></div>
                    
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Barcode</strong>
                </Tooltip>
            }>
                <Link to="/" data-toggle="tooltip" className="navIcon">
                    <div><i className="fas fa-qrcode"></i></div>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Days-Off</strong>
                </Tooltip>
            }>
                <Link to="/" data-toggle="tooltip" className="navIcon">
                    <div><i className="fas fa-umbrella-beach"></i></div>
                </Link>
            </OverlayTrigger>

            <OverlayTrigger placement='top'
            overlay={
                <Tooltip id='tooltip-top'>
                    <strong>Notifications</strong>
                </Tooltip>
            }>
                <Link to="/" data-toggle="tooltip" className="navIcon">
                    <div><i className="far fa-bell"></i></div>
                </Link>
            </OverlayTrigger>
        </MainFooter>  
    )
};

export default NavFooter;