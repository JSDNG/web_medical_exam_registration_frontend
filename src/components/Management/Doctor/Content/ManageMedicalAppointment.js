import "./ManageMedicalAppointment.scss";
import { getAllAppointmentFromDoctor } from "../../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MedicalAppointmentScheduleList from "./MedicalAppointmentScheduleList";
const ManageMedicalAppointment = (props) => {
    const [medicalAppointmentList, setMedicalAppointmentList] = useState([]);
    const [dateList, setDateList] = useState([]);
    const [index, setIndex] = useState(0);
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllAppointmentFromDoctor(account?.user?.id);
        if (res && res.EC === 0) {
            setMedicalAppointmentList(res.DT);
            setDateList(res.DT.map((item) => item.date));
        }
        if (res && res.EC !== 0) {
            console.log("err");
        }
    };
    console.log(medicalAppointmentList);
    return (
        <div className="medical-appointment-container">
            <div className="medical-appointment-content">
                {/* <div className="medical-appointment-header">
                    <div className="custom-img">
                        <div className="body-content-doctor">
                            <span className="name-text">
                                {infoDoctor?.Position?.positionName}, Bác sĩ {infoDoctor?.fullName}
                            </span>
                            <span className="description-text">{infoDoctor?.description}</span>
                            <span className="address-text">{infoDoctor?.address}</span>
                        </div>
                    </div>
                </div> */}

                <div className="medical-appointment-body">
                    <select
                        className="form-select pick-date-medical-appointment-custom"
                        onChange={(event) => setIndex(event.target.value)}
                    >
                        {dateList &&
                            dateList.length > 0 &&
                            dateList.map((item, index) => (
                                <option key={`${index}-ma`} value={index}>
                                    {item}
                                </option>
                            ))}
                    </select>

                    <MedicalAppointmentScheduleList medicalAppointmentList={medicalAppointmentList} index={index} />
                </div>
                <hr />
                <div className="appointment-footer"></div>
            </div>
        </div>
    );
};

export default ManageMedicalAppointment;
