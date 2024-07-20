import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./MedicalStaffInfo.scss";
import ModalUpdateMedicalStaffInfo from "./ModalUpdateMedicalStaffInfo";
const MedicalStaffInfo = (props) => {
    const [show, setShow] = useState(false);
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    const dispatch = useDispatch();

    return (
        <div className="medical-staff-info-container-custom">
            <div className="row medical-staff-info-body-custom">
                <label className=" label-title-custom">Thông tin cá nhân</label>
                <div className="col-md-6">
                    <span className="form-label">Họ tên: {account?.user?.fullName}</span>
                </div>
                <div className="col-md-6">
                    <span className="form-label">Chức vụ: {account?.user?.Position?.positionName}</span>
                </div>
                <div className="col-md-6">
                    <span className="form-label">Số điện thoại: {account?.user?.phone}</span>
                </div>
                <div className="col-md-6">
                    <span className="form-label">Email: {account?.email}</span>
                </div>
                <div className="col-md-6">
                    <span className="form-label">Giới tính: {account?.user?.gender}</span>
                </div>
                <div className="col-md-6">
                    <span className="form-label">Giá khám: {account?.user?.price} đ</span>
                </div>
                <div className="col-md-12">
                    <button className="btn btn-primary" onClick={() => setShow(true)}>
                        Cập nhật thông tin
                    </button>
                </div>
            </div>
            <ModalUpdateMedicalStaffInfo show={show} setShow={setShow} account={account} />
        </div>
    );
};

export default MedicalStaffInfo;
