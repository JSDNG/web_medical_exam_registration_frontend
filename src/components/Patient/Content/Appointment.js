import "./Appointment.scss";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Schedule from "./ScheduleList";
import imagedoctor from "../../../assets/image/image_doctor.jpg";
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Appointment = (props) => {
    const navigate = useNavigate();
    return (
        <div className="appointment-container">
            <div className="appointment-content">
                <div className="custom-link">
                    <IoHome onClick={() => navigate("/")} />
                    <span onClick={() => navigate("/dich-vu-y-te/kham-chuyen-khoa")}> / Khám chuyên khoa</span>
                    <span onClick={() => navigate("/dich-vu-y-te/kham-chuyen-khoa/tim-mach")}> / Tim mạch</span>
                </div>
                <div className="appointment-header">
                    <div className="custom-img">
                        <img src={imagedoctor} className="img-top" alt="..." />
                        <div className="body-content-doctor">
                            <span className="name-text">Tên</span>
                            <span className="description-text">Mô tả</span>
                            <span className="address-text">Địa chỉ</span>
                        </div>
                    </div>
                </div>
                <div className="appointment-body">
                    <Schedule />
                </div>
                <hr />
                <div className="appointment-footer">
                    <span>Mô tả</span>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
