//import "./AppointmentList.scss";
import { useNavigate } from "react-router-dom";
//import ModalCreactSchedule from "./ModalCreateSchedule";
import { useState, useEffect } from "react";
//import { getAllSchedule } from "../../../../services/apiService";
import { getAllAppointmentById } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
const AppointmentList = (props) => {
    const [show, setShow] = useState(false);
    const [appointmentList, setAppointmentList] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllAppointmentById(2);
        if (res && res.EC === 0) {
            setAppointmentList(res.DT);
        }
    };
    return (
        <div className="approve-appointment-container-manage-custom">
            <div className="approve-appointment-body-manage-custom">
                <table className="table table-bordered table-hover table-medical-custom">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Số thứ tự khám</th>
                            <th>Chuyên khoa</th>
                            <th>Họ và tên</th>
                            <th>Lịch sử bệnh án</th>
                            <th>Lí do khám</th>
                            <th>Số điện thoại</th>
                            <th>Thời gian</th>
                            <th>Ngày</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentList &&
                            appointmentList.length > 0 &&
                            appointmentList.map((item, index) => {
                                return (
                                    <tr key={index} onClick={() => setShow(true)}>
                                        <td>{index + 1}</td>
                                        <td>{item?.appointmentNumber}</td>
                                        <td>{item?.MedicalRecord?.specialtyMR}</td>
                                        <td>{item?.Patient?.fullName}</td>
                                        <td>{item?.MedicalRecord?.medicalHistory}</td>
                                        <td>{item?.MedicalRecord?.reason}</td>
                                        <td>{item?.Patient?.phone}</td>
                                        <td>{item?.time}</td>
                                        <td>{item?.date}</td>
                                        <td>{item?.statusAM}</td>
                                    </tr>
                                );
                            })}
                        {appointmentList && appointmentList.length === 0 && (
                            <tr>
                                <td colSpan={"4"}>Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentList;
