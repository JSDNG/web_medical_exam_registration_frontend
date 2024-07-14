import "./Profile.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderProfile from "./HeaderProfile";
const Profile = (props) => {
    return (
        <div className="profile-container">
            {/* <span className="title-custom">PHÊ DUYỆT LỊCH HẸN KHÁM BỆNH CỦA BỆNH NHÂN</span> */}
            <div className="header-profile-custom">
                <HeaderProfile />
                <hr />
            </div>
            <div className="profile-main">
                <div className="outlet-profile-custom">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Profile;
