import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MedicalStaffInfo.scss";
import ModalUpdateMedicalStaffInfo from "./ModalUpdateMedicalStaffInfo";
const MedicalStaffInfo = (props) => {
    const [show, setShow] = useState(false);
    const account = useSelector((state) => state?.user?.account);
    return (
        <div className="medical-staff-info-container-custom">
            <label className=" label-title-custom">Thông tin cá nhân</label>
            <div className="medical-staff-info-header-custom">
                <div className="div-img-info-custom">
                    <img src={`data:image/jpeg;base64,${account?.user?.image}`} className="card-img-top" />
                </div>
                <div className="row medical-staff-info-body-custom">
                    <div className="col-md-6">
                        <label className="form-label">Họ tên: {account?.user?.fullName}</label>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Chức vụ: {account?.user?.Position?.positionName}</label>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Chuyên khoa: </label>
                        {account?.user?.Specialties &&
                            account?.user?.Specialties.length > 0 &&
                            account?.user?.Specialties.map((item, index) => {
                                return <span key={index}>{item?.specialtyName}, </span>;
                            })}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Số điện thoại: {account?.user?.phone}</label>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email: {account?.email}</label>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Giới tính: {account?.user?.gender}</label>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Giá khám: {account?.user?.price} đ</label>
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">Mô tả: {account?.user?.description}</label>
                    </div>
                    <div className="col-md-12">
                        <button className="btn btn-primary" onClick={() => setShow(true)}>
                            Cập nhật thông tin
                        </button>
                    </div>
                </div>
            </div>
            <ModalUpdateMedicalStaffInfo show={show} setShow={setShow} account={account} />
        </div>
    );
};

export default MedicalStaffInfo;
