//import "./AppointmentListRelative.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllMedicalRecordfromPatient } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
const AppointmentListRelative = (props) => {
    const [show, setShow] = useState(false);
    const [appointmentListRelative, setAppointmentListRelative] = useState([]);
    const account = useSelector((state) => state?.user?.account);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllMedicalRecordfromPatient(account?.user?.id, 6);
        if (res && res.EC === 0) {
            setAppointmentListRelative(res.DT.MedicalRecordRelative);
        }
    };
    return (
        <div className="appointment-history-relative-container-manage-custom">
            <div className="appointment-history-relative-body-manage-custom">
                <table className="table table-hover table-medical-custom">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Số thứ tự khám</th>
                            <th>Chuyên khoa</th>
                            <th>Họ và tên</th>
                            <th>Lịch sử bệnh án</th>
                            <th>Lí do khám</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Ngày</th>
                            <th>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentListRelative &&
                            appointmentListRelative.length > 0 &&
                            appointmentListRelative.map((item, index) => {
                                return (
                                    <tr key={index} onClick={() => setShow(true)}>
                                        <td>{index + 1}</td>
                                        <td>{item?.appointmentNumber}</td>
                                        <td>{item?.specialtyMR}</td>
                                        <td>{item?.Patient?.fullName}</td>
                                        <td>{item?.medicalHistory}</td>
                                        <td>{item?.reason}</td>
                                        <td>{item?.Patient?.phone}</td>
                                        <td>{item?.statusMR}</td>
                                        <td>{item?.date}</td>
                                        <td>{item?.time}</td>
                                    </tr>
                                );
                            })}
                        {appointmentListRelative && appointmentListRelative.length === 0 && (
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

export default AppointmentListRelative;
