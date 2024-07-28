import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MedicalStaffInfo.scss";
import ModalUpdateMedicalStaffInfo from "./ModalUpdateMedicalStaffInfo";
const MedicalStaffInfo = (props) => {
    const [show, setShow] = useState(false);
    const account = useSelector((state) => state?.user?.account);
    return (
        <div className="medical-staff-info-container-custom">
            <label className="label-title-custom">Thông tin {account?.user?.fullName}</label>
            <div className="medical-staff-info-header-custom">
                <div className="div-img-info-custom">
                    <img src={`data:image/jpeg;base64,${account?.user?.image}`} className="card-img-top" />
                </div>
                <div className="row medical-staff-info-body-custom">
                    <div className="col-md-6 mb-4">
                        <label className="form-label">Họ tên:</label>
                        <span className="fw-semibold"> {account?.user?.fullName}</span>
                    </div>
                    {account?.role === "Bác sĩ" ? (
                        <>
                            <div className="col-md-6 mb-4">
                                <label className="form-label">Chức vụ: </label>
                                <span className="fw-semibold"> {account?.user?.Position?.positionName}</span>
                            </div>
                            <div className="col-md-6 mb-4">
                                <label className="form-label">Chuyên khoa: </label>
                                {account?.user?.Specialties &&
                                    account?.user?.Specialties.length > 0 &&
                                    account?.user?.Specialties.map((item, index) => {
                                        return (
                                            <span className="fw-semibold" key={index}>
                                                {item?.specialtyName},{" "}
                                            </span>
                                        );
                                    })}
                            </div>
                            <div className="col-md-6 mb-4">
                                <label className="form-label">Giá khám:</label>
                                <span className="fw-semibold"> {account?.user?.price} đ</span>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    <div className="col-md-6 mb-4">
                        <label className="form-label">Số điện thoại:</label>
                        <span className="fw-semibold"> {account?.user?.phone}</span>
                    </div>
                    <div className="col-md-6 mb-4">
                        <label className="form-label">Email:</label>
                        <span className="fw-semibold"> {account?.email}</span>
                    </div>
                    <div className="col-md-6 mb-4">
                        <label className="form-label">Giới tính:</label>
                        <span className="fw-semibold"> {account?.user?.gender}</span>
                    </div>

                    <div className="col-md-12 mb-4 ">
                        <label className="form-label">Mô tả: </label>
                        <span className="fw-semibold"> {account?.user?.description}</span>
                    </div>
                    <div className="col-md-12 mb-4 d-flex justify-content-end ">
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
