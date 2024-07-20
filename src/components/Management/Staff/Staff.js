import "./Staff.scss";
import { Outlet } from "react-router-dom";
import HeaderStaff from "./HeaderStaff";
const Staff = (props) => {
    return (
        <div className="staff-container">
            <span className="title-custom">PHÊ DUYỆT LỊCH HẸN KHÁM BỆNH CỦA BỆNH NHÂN</span>
            <div className="header-staff-custom">
                <HeaderStaff />
                <hr />
            </div>
            <div className="staff-main">
                <div className="outlet-staff-custom">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Staff;
