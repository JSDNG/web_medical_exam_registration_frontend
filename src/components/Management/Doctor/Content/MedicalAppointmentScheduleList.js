import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./MedicalAppointmentScheduleList.scss";
const MedicalAppointmentScheduleList = (props) => {
    const { medicalAppointmentList, index } = props;
    const [scheduleId, setScheduleId] = useState("");
    const handleOnClickTime = (id) => {
        setScheduleId(id);
    };
    return (
        <div className="medical-appointment-list-container-client">
                {/* <div className="d-flex align-items-center">
                    <FaCalendarAlt />
                    <span>LỊCH KHÁM</span>
                </div> */}
                <div className=" custom--client-for-date">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient Name</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Price</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicalAppointmentList[index]?.data &&
                                medicalAppointmentList[index]?.data.length > 0 &&
                                medicalAppointmentList[index]?.data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item?.Patient?.fullName}</td>
                                            <td>{item?.Patient?.dateOfBirth}</td>
                                            <td>{item?.Patient?.gender}</td>
                                            <td>{item?.Patient?.phone}</td>
                                            <td>{item?.Patient?.address}</td>
                                            <td>{item?.Schedule?.price}</td>
                                            <td>{item?.Schedule?.PeriodOfTime?.time}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
                {/* <ModalCreateAppointment
                    showAppointment={showAppointment}
                    setShowAppointment={setShowAppointment}
                    specialties={specialties}
                    scheduleId={scheduleId}
                    doctorId={doctorId}
                /> */}
          
        </div>
    );
};

export default MedicalAppointmentScheduleList;
