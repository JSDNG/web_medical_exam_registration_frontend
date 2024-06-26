import Sidebar from "../Sidebar";
import "./Doctor.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
const Doctor = (props) => {
    const [collapsed, setcollapsed] = useState(false);
    return (
        <div className="doctor-container">
            <div className="Doctor-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="doctor-content">
                <div className="doctor-header">
                    <FaBars onClick={() => setcollapsed(!collapsed)} />
                </div>
                <PerfectScrollbar>
                    <div className="doctor-main">
                        <Outlet />
                    </div>
                </PerfectScrollbar>
            </div>
        </div>
    );
};

export default Doctor;