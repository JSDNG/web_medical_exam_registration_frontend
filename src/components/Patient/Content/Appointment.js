import "./Appointment.scss";
import { useState, useEffect } from "react";
import ScheduleList from "./ScheduleList";
import { IoHome } from "react-icons/io5";
import { getAllSchedule } from "../../../services/apiService";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
const Appointment = (props) => {
    const [index, setIndex] = useState(0);
    const [scheduleList, setScheduleList] = useState([]);
    const [dateList, setDateList] = useState([]);
    const [doctorInfor, setDoctorInfor] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const id = params.id;

    useEffect(() => {
        setDoctorInfor(location?.state?.data);
        getData();
    }, [id]);
    const getData = async () => {
        let res = await getAllSchedule(id);
        if (res && res.EC === 0) {
            // Lọc các lịch trình theo điều kiện Appointment
            res.DT.forEach((entry) => {
                entry.schedules = entry.schedules.filter((schedule) => {
                    if (schedule.Appointment && schedule.Appointment.id === null) {
                        delete schedule.Appointment;
                        return true;
                    }
                    return !schedule.Appointment || schedule.Appointment.id === null;
                });
            });
            let date = moment(new Date(Date.now())).format("YYYY-MM-DD");
            const result = res.DT.filter((item) => item.schedules.length > 0 && item.date > date);
            setScheduleList(result);
            setDateList(result.map((item) => item.date));
        }
    };
    return (
        <div className="appointment-container">
            <div className="appointment-content">
                <div className="custom-link">
                    <IoHome onClick={() => navigate("/")} />
                    <span onClick={() => navigate("/dich-vu-y-te/kham-chuyen-khoa")}> / Khám chuyên khoa</span>
                    {/* <span onClick={() => navigate("/dich-vu-y-te/kham-chuyen-khoa/tim-mach")}> / Tim mạch</span> */}
                </div>
                <div className="appointment-header">
                    <div className="custom-img">
                        <img src={`data:image/jpeg;base64,${doctorInfor?.image}`} className="img-top" alt="..." />

                        <div className="body-content-doctor">
                            <span className="name-text">
                                {doctorInfor?.Position?.positionName}, Bác sĩ {doctorInfor?.fullName}
                            </span>
                            <span className="description-text">{doctorInfor?.description}</span>
                            <span className="address-text">{doctorInfor?.address}</span>
                        </div>
                    </div>
                </div>

                <div className="appointment-body">
                    <select
                        className="form-select pick-date-appointment-custom"
                        onChange={(event) => setIndex(event.target.value)}
                    >
                        {dateList &&
                            dateList.length > 0 &&
                            dateList.map((item, index) => (
                                <option key={`${index}-a`} value={index}>
                                    {item}
                                </option>
                            ))}
                    </select>

                    <ScheduleList
                        scheduleList={scheduleList}
                        dateList={dateList}
                        index={index}
                        doctorInfor={doctorInfor}
                        getData={getData}
                    />
                </div>
                <hr />
                <div className="appointment-footer">
                    <span>Mô tả</span>
                    <div>
                        <span>{doctorInfor?.description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
