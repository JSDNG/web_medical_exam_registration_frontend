import Sidebar from "../Sidebar";
import "./Staff.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
const Staff = (props) => {
    const [collapsed, setcollapsed] = useState(false);
    return (
        <div className="staff-container">
            <div className="staff-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="staff-content">
                <div className="staff-header">
                    <FaBars onClick={() => setcollapsed(!collapsed)} />
                </div>
                <PerfectScrollbar>
                    <div className="staff-main">
                        <Outlet />
                    </div>
                </PerfectScrollbar>
            </div>
        </div>
    );
};

export default Staff;
