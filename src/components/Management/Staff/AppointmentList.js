import { useState, useEffect } from "react";
import { getAllAppointmentById } from "../../../services/apiService";
const AppointmentList = (props) => {
    const [appointmentList, setAppointmentList] = useState([]);
    const [data, setData] = useState({});
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllAppointmentById(2);
        if (res && res.EC === 0) {
            setAppointmentList(res.DT);
        }
    };
    const handleClick = (data) => {
        setData(data);
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
                            <th>Trạng thái</th>
                            <th>Thời gian</th>
                            <th>Ngày</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentList &&
                            appointmentList.length > 0 &&
                            appointmentList.map((item, index) => {
                                return (
                                    <tr key={index} onClick={() => handleClick(item)}>
                                        <td>{index + 1}</td>
                                        <td>{item?.appointmentNumber}</td>
                                        <td>{item?.MedicalRecord?.specialtyMR}</td>
                                        <td>{item?.Patient?.fullName}</td>
                                        <td>{item?.MedicalRecord?.medicalHistory}</td>
                                        <td>{item?.MedicalRecord?.reason}</td>
                                        <td>{item?.Patient?.phone}</td>
                                        <td>{item?.statusAM}</td>
                                        <td>{item?.time}</td>
                                        <td>{item?.date}</td>
                                    </tr>
                                );
                            })}
                        {appointmentList && appointmentList.length === 0 && (
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

export default AppointmentList;
