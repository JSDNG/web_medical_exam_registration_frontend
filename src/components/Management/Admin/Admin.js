import "./Admin.scss";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const Admin = (props) => {
    return (
        <div className="admin-container">
            <div className="admin-main">
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;
