import ModalCreateAppointment from "./ModalCreateAppointment";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./ScheduleList.scss";
const ScheduleList = (props) => {
    const { scheduleList, index, specialties, doctorId } = props;
    const [showAppointment, setShowAppointment] = useState(false);
    const [scheduleId, setScheduleId] = useState("");
    const handleOnClickTime = (id) => {
        setShowAppointment(true);
        setScheduleId(id);
    };
    return (
        <div className="schedule-container-client">
            <div className="custom-booking-schedule">
                <div className="d-flex align-items-center">
                    <FaCalendarAlt />
                    <span>LỊCH KHÁM</span>
                </div>
                <div className=" custom-schedule-client-for-date">
                    {scheduleList[index]?.schedules &&
                        scheduleList[index]?.schedules.length > 0 &&
                        scheduleList[index]?.schedules.map((item, index) => {
                            return (
                                <button
                                    key={`${index}-s`}
                                    className="btn btn-light btn-click-pick-time-custom"
                                    onClick={() => handleOnClickTime(item?.id)}
                                >
                                    {item?.timeId?.time}
                                </button>
                            );
                        })}
                </div>
                <span className="span-schedule-client-custom">Chọn và đặt (Phí đặt lịch 0đ)</span>
                <ModalCreateAppointment
                    showAppointment={showAppointment}
                    setShowAppointment={setShowAppointment}
                    specialties={specialties}
                    scheduleId={scheduleId}
                    doctorId={doctorId}
                />
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

export default ScheduleList;
