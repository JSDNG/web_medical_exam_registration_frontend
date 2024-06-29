import ModalCreateAppointment from "./ModalCreateAppointment";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./ScheduleList.scss";
const Schedule = (props) => {
    const [showAppointment, setShowAppointment] = useState(false);
    return (
        <div className="schedule-container ">
            <div className="custom-schedule ">
                <span>calendar</span>
                <div className="d-flex align-items-center">
                    <FaCalendarAlt />
                    <span>LỊCH KHÁM</span>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-2">
                            <button class="btn btn-light btn-custom" onClick={() => setShowAppointment(true)}>
                                Click 1
                            </button>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-light btn-custom" onClick={() => setShowAppointment(true)}>
                                Click 2
                            </button>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-light btn-custom" onClick={() => setShowAppointment(true)}>
                                Click 3
                            </button>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-light btn-custom" onClick={() => setShowAppointment(true)}>
                                Click 4
                            </button>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-light btn-custom" onClick={() => setShowAppointment(true)}>
                                Click 5
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-2">
                            <button class="btn btn-light btn-custom" onClick={() => setShowAppointment(true)}>
                                Click 6
                            </button>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-light btn-custom" onClick={() => setShowAppointment(true)}>
                                Click 7
                            </button>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-light btn-custom" onClick={() => setShowAppointment(true)}>
                                Click 8
                            </button>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-light btn-custom" onClick={() => setShowAppointment(true)}>
                                Click 9
                            </button>
                        </div>
                        <div class="col-2">
                            <button class="btn btn-light btn-custom" onClick={() => setShowAppointment(true)}>
                                Click 10
                            </button>
                        </div>
                    </div>
                </div>
                <span>Chọn và đặt (Phí đặt lịch 0đ)</span>
                <ModalCreateAppointment showAppointment={showAppointment} setShowAppointment={setShowAppointment} />
            </div>
            <div className="custom-extra">
                <span>ĐỊA CHỈ KHÁM</span>
                <span>Bệnh viện Đa khoa Bảo Sơn</span>
                <span>Địa chỉ</span>
                <hr />
                <span>GIÁ KHÁM: 300.000đ</span>
                <hr />
                <span>LOẠI BẢO HIỂM ÁP DỤNG</span>
            </div>
        </div>
    );
};

export default Schedule;
