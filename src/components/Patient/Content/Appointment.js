import "./Appointment.scss";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import ScheduleList from "./ScheduleList";
import imagedoctor from "../../../assets/image/image_doctor.jpg";
import { IoHome } from "react-icons/io5";
import { getAllSchedule } from "../../../services/apiService";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
const Appointment = (props) => {
    const [index, setIndex] = useState(0);
    const [scheduleList, setScheduleList] = useState([]);
    const [dateList, setDateList] = useState([]);
    const [infoDoctor, setInfoDoctor] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const id = params.id;

    useEffect(() => {
        setInfoDoctor(location?.state?.data);
        getData();
    }, [id]);
    const getData = async () => {
        let res = await getAllSchedule(id);
        if (res && res.EC === 0) {
            setScheduleList(res.DT);
            setDateList(res.DT.map((item) => item.date));
        }
    };
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
                        <img src={`data:image/jpeg;base64,${infoDoctor?.image}`} className="img-top" alt="..." />

                        <div className="body-content-doctor">
                            <span className="name-text">
                                {infoDoctor?.Position?.positionName}, Bác sĩ {infoDoctor?.fullName}
                            </span>
                            <span className="description-text">{infoDoctor?.description}</span>
                            <span className="address-text">{infoDoctor?.address}</span>
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

                    <ScheduleList scheduleList={scheduleList} index={index} infoDoctor={infoDoctor} getData={getData} />
                </div>
                <hr />
                <div className="appointment-footer">
                    <span>Mô tả</span>
                    <div>
                        <span>{infoDoctor?.description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
