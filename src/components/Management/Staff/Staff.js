import "./Staff.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Management/Header";
const Staff = (props) => {
    return (
        <div className="staff-container">
            <div className="staff-content">
                <div className="staff-header">
                    <Header />
                </div>
                <div className="staff-main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Staff;
