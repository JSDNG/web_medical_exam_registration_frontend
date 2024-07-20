import ModalCreateAppointment from "./ModalCreateAppointment";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./ScheduleList.scss";
const ScheduleList = (props) => {
    const { scheduleList, dateList, index, doctorInfor } = props;
    const [showAppointment, setShowAppointment] = useState(false);
    const [scheduleId, setScheduleId] = useState("");
    const [time, setTime] = useState("");
    const handleOnClickTime = (id, time) => {
        setShowAppointment(true);
        setScheduleId(id);
        setTime(time);
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
                                    onClick={() => handleOnClickTime(item?.id, item?.timeId?.time)}
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
                    specialties={doctorInfor?.Specialties}
                    scheduleId={scheduleId}
                    doctorId={doctorInfor?.id}
                    getData={props.getData}
                    doctorInfor={doctorInfor}
                    time={time}
                    dateList={dateList}
                    index={index}
                />
            </div>
            <div className="vertical-separator"></div>
            <div className="custom-extra">
                <span>ĐỊA CHỈ KHÁM</span>
                <span>97 Man Thiện, phường Hiệp Phú, TP. Thủ Đức</span>
                <hr />
                <span>GIÁ KHÁM: {doctorInfor?.price} đ</span>
            </div>
        </div>
    );
};

export default ScheduleList;
