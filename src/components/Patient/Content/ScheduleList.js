import ModalCreateAppointment from "./ModalCreateAppointment";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./ScheduleList.scss";
const Schedule = (props) => {
    const { listSchedule, index } = props;
    const [showAppointment, setShowAppointment] = useState(false);
    return (
        <div className="schedule-container-client">
            <div className="custom-booking-schedule">
                <div className="d-flex align-items-center">
                    <FaCalendarAlt />
                    <span>LỊCH KHÁM</span>
                </div>
                <div className=" custom-schedule-client-for-date">
                    {listSchedule[index]?.schedules &&
                        listSchedule[index]?.schedules.length > 0 &&
                        listSchedule[index]?.schedules.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    className="btn btn-light btn-click-pick-time-custom"
                                    onClick={() => setShowAppointment(true)}
                                >
                                    {item?.timeId?.time}
                                </button>
                            );
                        })}
                </div>
                <span className="span-schedule-client-custom">Chọn và đặt (Phí đặt lịch 0đ)</span>
                <ModalCreateAppointment showAppointment={showAppointment} setShowAppointment={setShowAppointment} />
            </div>
            <div className="vertical-separator"></div>
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
