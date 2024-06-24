import HeaderProfile from "./HeaderProfile";
import "./Profile.scss";
import { Outlet } from "react-router-dom";
const Profile = (props) => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <span> Thư viện của bạn</span>
            </div>

            <div className="profile-content">
                <div className="header-profile">
                    <HeaderProfile />
                    <hr />
                </div>
                <div className="profile-main">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Profile;
