import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./MedicalAppointmentScheduleList.scss";
import ModalMedicalAppointment from "./ModalMedicalAppointment";
import moment from "moment";
import { toast } from "react-toastify";
const MedicalAppointmentScheduleList = (props) => {
    const { medicalAppointmentList, index } = props;
    const [show, setShow] = useState(false);
    const [medicalInfo, setMedicalInfo] = useState({});
    const handleOnClick = (item) => {
        let date = new Date(Date.now());
        if (moment(date).format("YYYY-MM-DD") === medicalAppointmentList[index].date) {
            setShow(true);
            setMedicalInfo(item);
        } else {
            toast.warning("Không phải thời gian khám!");
        }
    };
    return (
        <div className="medical-appointment-list-container-client">
            <div className="custom-table-for-medical">
                <table className="table table-bordered table-hover table-medical-custom">
                    <thead>
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Chuyên khoa</th>
                            <th>Tên bệnh nhân</th>
                            <th>Số điện thoại</th>
                            <th>Khoảng thời gian </th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalAppointmentList[index]?.data &&
                            medicalAppointmentList[index]?.data.length > 0 &&
                            medicalAppointmentList[index]?.data.map((item, index) => {
                                return (
                                    <tr key={index} onClick={() => handleOnClick(item)}>
                                        <td>{item?.appointmentNumber}</td>
                                        <td>{item?.MedicalRecord?.specialtyMR}</td>
                                        <td>{item?.Patient?.fullName}</td>
                                        <td>{item?.Patient?.phone}</td>
                                        <td>{item?.time}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <ModalMedicalAppointment show={show} setShow={setShow} medicalInfo={medicalInfo} getData={props.getData} />
        </div>
    );
};

export default MedicalAppointmentScheduleList;
