import { useState, useEffect } from "react";
import { getAllAppointmentById } from "../../../services/apiService";
import ModalApproveAppointment from "./ModalApproveAppointment";
const ApproveAppointment = (props) => {
    const [show, setShow] = useState(false);
    const [appointmentList, setAppointmentList] = useState([]);
    const [data, setData] = useState({});
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllAppointmentById(1);
        if (res && res.EC === 0) {
            setAppointmentList(res.DT);
        }
    };
    const handleClick = (data) => {
        setShow(true);
        setData(data);
    };
    return (
        <div className="approve-appointment-container-manage-custom">
            <table className="table table-hover approve-appointment-custom">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Số thứ tự</th>
                        <th>Chuyên khoa</th>
                        <th>Họ và tên</th>
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
                                <tr
                                    key={index}
                                    onClick={() => handleClick(item)}
                                    className="tr-approve-appointment-custom"
                                >
                                    <td>{index + 1}</td>
                                    <td>{item?.appointmentNumber}</td>
                                    <td>{item?.MedicalRecord?.specialtyMR}</td>
                                    <td>{item?.Patient?.fullName}</td>
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
            <ModalApproveAppointment show={show} setShow={setShow} getData={getData} data={data} />
        </div>
    );
};

export default ApproveAppointment;
