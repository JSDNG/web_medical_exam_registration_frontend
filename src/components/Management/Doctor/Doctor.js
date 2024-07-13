import "./Doctor.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const Doctor = (props) => {
    return (
        <div className="doctor-container">
            <div className="doctor-main">
                <Outlet />
            </div>
        </div>
    );
};

export default Doctor;
