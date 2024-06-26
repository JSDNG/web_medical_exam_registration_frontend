import "./Patient.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
const Patient = (props) => {
    const [collapsed, setcollapsed] = useState(false);
    return (
        <div className="patient-container">
            <div className="patient-content">
                <div className="patient-header"></div>
                <PerfectScrollbar>
                    <div className="patient-main">
                        <Outlet />
                    </div>
                </PerfectScrollbar>
            </div>
        </div>
    );
};

export default Patient;
