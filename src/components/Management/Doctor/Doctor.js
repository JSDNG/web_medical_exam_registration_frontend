import "./Doctor.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Management/Header";
const Doctor = (props) => {
    return (
        <div className="doctor-container">
            <div className="doctor-header">
                <Header />
            </div>
            <div className="doctor-main">
                <Outlet />
            </div>
        </div>
    );
};

export default Doctor;
