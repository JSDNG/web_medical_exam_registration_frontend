import "./ManageMedicalAppointment.scss";
import { getAllAppointmentFromDoctor } from "../../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MedicalAppointmentScheduleList from "./MedicalAppointmentScheduleList";
const ManageMedicalAppointment = (props) => {
    const [medicalAppointmentList, setMedicalAppointmentList] = useState([]);
    const [dateList, setDateList] = useState([]);
    const [index, setIndex] = useState(0);
    const account = useSelector((state) => state?.user?.account);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllAppointmentFromDoctor(account?.user?.id, 2);
        if (res && res.EC === 0) {
            setMedicalAppointmentList(res.DT);
            setDateList(res.DT.map((item) => item.date));
        }
        if (res && res.EC !== 0) {
            console.log("err");
        }
    };
    return (
        <div className="medical-appointment-container">
            <div className="medical-appointment-list-header-manage-custom">
                <span className="title-custom">LỊCH TRÌNH KHÁM BỆNH CỦA BÁC SĨ</span>
            </div>
            <div className="medical-appointment-content">
                <div className="medical-appointment-body">
                    <label className="form-label">Chọn ngày</label>
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
                </div>
                <MedicalAppointmentScheduleList
                    medicalAppointmentList={medicalAppointmentList}
                    index={index}
                    getData={getData}
                />
                <div className="appointment-footer"></div>
            </div>
        </div>
    );
};

export default ManageMedicalAppointment;
