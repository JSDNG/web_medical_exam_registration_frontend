import ModalCreateAppointment from "./ModalCreateAppointment";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./ScheduleList.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ScheduleList = (props) => {
    const { scheduleList, dateList, index, doctorInfor } = props;
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const [showAppointment, setShowAppointment] = useState(false);
    const [scheduleId, setScheduleId] = useState("");
    const [time, setTime] = useState("");
    const navigate = useNavigate();
    const handleOnClickTime = (id, time) => {
        if (isAuthenticated === false) {
            navigate("/dang-nhap");
        }
        setShowAppointment(true);
        setScheduleId(id);
        setTime(time);
    };
    return (
        <div className="schedule-container-client">
            <div className="custom-booking-schedule">
                <div className="d-flex align-items-center gap-2">
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
                <span className="fw-semibold">97 Man Thiện, phường Hiệp Phú, TP. Thủ Đức</span>
                <hr />
                <span>GIÁ KHÁM: {doctorInfor?.price} đ</span>
            </div>
        </div>
    );
};

export default ScheduleList;
