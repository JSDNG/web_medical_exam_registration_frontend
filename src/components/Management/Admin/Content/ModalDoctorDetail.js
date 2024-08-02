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
const ModalDoctorDetail = (props) => {
    const { show, setShow, doctorDetail } = props;
    const handleClose = () => {
        setShow(false);
    };
    console.log(doctorDetail);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size="md"
                backdrop="static"
                className="modal-medical-appointment"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin chi tiết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <img src={`data:image/jpeg;base64,${doctorDetail?.image}`} style={{ width: "180px" }} />
                        </div>
                        <div className="col-md-6 d-flex flex-column gap-4">
                            <div className="col-md-12">
                                <IoPersonSharp />
                                <span> {doctorDetail?.fullName}</span>
                            </div>

                            <div className="col-md-12">
                                <MdLocalPhone />
                                <span> {doctorDetail?.phone}</span>
                            </div>

                            <div className="col-md-12">
                                <MdOutlineMarkEmailRead />
                                <span> {doctorDetail?.Account?.email}</span>
                            </div>
                            <div className="col-md-12">
                                <FaTransgender />
                                <span> {doctorDetail?.gender}</span>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalDoctorDetail;
