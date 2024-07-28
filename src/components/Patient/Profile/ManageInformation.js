import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalUpdatePatientInfo from "./ModalUpdatePatientInfo";
const ManageInformation = (props) => {
    const [show, setShow] = useState(false);
    const account = useSelector((state) => state?.user?.account);
    return (
        <div className=" row profile-info-custom">
            <label className="profile-title-custom">Thông tin bệnh nhân</label>
            <div className="col-md-6 mb-4 d-flex flex-column ">
                <label className="form-label">Họ tên:</label>
                <span className="fw-semibold"> {account?.user?.fullName}</span>
            </div>
            <div className="col-md-6 mb-4 d-flex flex-column ">
                <label className="form-label">Số điện thoại:</label>
                <span className="fw-semibold"> {account?.user?.phone}</span>
            </div>
            <div className="col-md-6 mb-4 d-flex flex-column ">
                <label className="form-label">Email:</label>
                <span className="fw-semibold"> {account?.email}</span>
            </div>
            <div className="col-md-6 mb-4 d-flex flex-column ">
                <label className="form-label">Giới tính:</label>
                <span className="fw-semibold"> {account?.user?.gender}</span>
            </div>
            <div className="col-md-6 mb-4 d-flex flex-column ">
                <label className="form-label">Ngày sinh:</label>
                <span className="fw-semibold"> {account?.user?.dateOfBirth}</span>
            </div>
            <div className="col-md-6 mb-4 d-flex flex-column ">
                <label className="form-label">Địa chỉ:</label>
                <span className="fw-semibold"> {account?.user?.address} </span>
            </div>
            <div className="col-md-12">
                <button className="btn btn-primary" onClick={() => setShow(true)}>
                    Cập nhật thông tin
                </button>
            </div>
            <ModalUpdatePatientInfo show={show} setShow={setShow} account={account} />
        </div>
    );
};

export default ManageInformation;
