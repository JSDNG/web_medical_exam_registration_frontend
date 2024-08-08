import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CgCalendarDates } from "react-icons/cg";
import { FaTransgender } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { FaStethoscope } from "react-icons/fa";
import { CgTime } from "react-icons/cg";
const ModalRecordView = (props) => {
    const { showView, setShowView, data } = props;
    const handleClose = () => {
        setShowView(false);
    };
    console.log(data);
    return (
        <>
            <Modal
                show={showView}
                onHide={handleClose}
                animation={false}
                size="md"
                backdrop="static"
                className="modal-medical-appointment"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết bệnh án</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <FaStethoscope />
                            <span> {data?.MedicalRecord?.specialtyMR} </span>
                        </div>
                        <div className="col-md-6">
                            <span>Số thứ tự: {data?.appointmentNumber} </span>
                        </div>

                        <div className="col-md-6">
                            <span>
                                {" "}
                                <CgCalendarDates style={{ fontSize: "22px" }} /> {data?.date}
                            </span>
                        </div>
                        <div className="col-md-6 ">
                            <span>
                                <CgTime style={{ fontSize: "22px" }} /> {data?.time}
                            </span>
                        </div>
                        <div className="col-md-6">
                            <IoPersonSharp />
                            <span> {data?.Patient?.fullName}</span>
                        </div>

                        <div className="col-md-6">
                            <MdLocalPhone />
                            <span> {data?.Patient?.phone}</span>
                        </div>

                        <div className="col-md-6">
                            <MdOutlineMarkEmailRead />
                            <span> {data?.Patient?.email}</span>
                        </div>
                        <div className="col-md-6">
                            <FaTransgender />
                            <span> {data?.Patient?.gender}</span>
                        </div>
                        <div className="col-md-6">
                            <CgCalendarDates />
                            <span> {data?.Patient?.dateOfBirth}</span>
                        </div>
                        <div className="col-md-6">
                            <FaHome />
                            <span> {data?.Patient?.address}</span>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Lí do khám:</label>
                            <span> {data?.MedicalRecord?.reason}</span>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Lịch sử bệnh án: </label>
                            <span> {data?.MedicalRecord?.medicalHistory}</span>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Chẩn đoán: </label>
                            <span> {data?.MedicalRecord?.diagnosis}</span>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalRecordView;
