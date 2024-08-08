//import "./AppointmentListPatient.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllMedicalRecordfromPatient } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
const AppointmentListPatient = (props) => {
    const [show, setShow] = useState(false);
    const [appointmentListPatient, setAppointmentListPatient] = useState([]);
    const account = useSelector((state) => state?.user?.account);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllMedicalRecordfromPatient(account?.user?.id, 6);
        if (res && res.EC === 0) {
            setAppointmentListPatient(res.DT.MedicalRecordPatient);
        }
    };
    return (
        <div className="appointment-history-patient-container-manage-custom">
            <div className="appointment-history-patient-body-manage-custom">
                <table className="table table-hover table-medical-custom">
                    <thead>
                        <tr>
                            <th>Số thứ tự khám</th>
                            <th>Chuyên khoa</th>
                            <th>Họ và tên</th>
                            <th>Bác sĩ điều trị</th>
                            <th>Lí do khám</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Ngày</th>
                            <th>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentListPatient &&
                            appointmentListPatient.length > 0 &&
                            appointmentListPatient.map((item, index) => {
                                return (
                                    <tr key={index} onClick={() => setShow(true)}>
                                        <td>{item?.appointmentNumber}</td>
                                        <td>{item?.specialtyMR}</td>
                                        <td>{item?.Patient?.fullName}</td>
                                        <td>{item?.MedicalStaff?.fullName}</td>
                                        <td>{item?.reason}</td>
                                        <td>{item?.Patient?.phone}</td>
                                        <td>{item?.statusMR}</td>
                                        <td>{item?.date}</td>
                                        <td>{item?.time}</td>
                                    </tr>
                                );
                            })}
                        {appointmentListPatient && appointmentListPatient.length === 0 && (
                            <tr>
                                <td colSpan={"10"}>Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentListPatient;
