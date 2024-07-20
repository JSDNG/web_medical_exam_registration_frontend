import { useState, useEffect } from "react";
//import { getAllMedicalRecordfromPatient } from "../../../services/apiService";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const ManageInformation = (props) => {
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    const dispatch = useDispatch();
    return (
        <div className="">
            <div className="row">
                <label className="offset-md-3">Thông tin bệnh nhân</label>
                <div className="col-md-6">
                    <span className="form-label">Họ tên bệnh nhân: {account?.user?.fullName}</span>
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
                    <span className="form-label">Ngày sinh: {account?.user?.dateOfBirth}</span>
                </div>
                <div className="col-md-6">
                    <span className="form-label">Địa chỉ: {account?.user?.address} </span>
                </div>
                {/* <div className="col-md-6">
                    <button className="btn btn-primary ">Cập nhật thông tin </button>
                </div> */}
            </div>
        </div>
    );
};

export default ManageInformation;
