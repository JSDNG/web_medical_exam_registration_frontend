import "./AppointmentHistory.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderAppointmentHistory from "./HeaderAppointmentHistory";
const AppointmentHistory = (props) => {
    return (
        <div className="appointment-history-container">
            {/* <span className="title-custom">PHÊ DUYỆT LỊCH HẸN KHÁM BỆNH CỦA BỆNH NHÂN</span> */}
            <div className="header-appointment-history-custom">
                <HeaderAppointmentHistory />
                <hr />
            </div>
            <div className="appointment-history-main">
                <div className="outlet-appointment-history-custom">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppointmentHistory;
