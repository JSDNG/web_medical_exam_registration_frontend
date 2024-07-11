import "./Profile.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
const Profile = (props) => {
    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-header"></div>

                <div className="profile-main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Profile;