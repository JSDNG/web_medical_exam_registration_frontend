import { useState, useEffect } from "react";
import { getAllMedicalRecordfromPatient } from "../../../services/apiService";
const MedicalRecordRelative = (props) => {
    const [show, setShow] = useState(false);
    const [medicalRecordRelative, setMedicalRecordRelative] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllMedicalRecordfromPatient(1, 7);
        if (res && res.EC === 0) {
            setMedicalRecordRelative(res.DT.MedicalRecordRelative);
        }
    };
    return (
        <div className="medical-record-relative-container-manage-custom">
            <div className="medical-record-relative-body-manage-custom">
                <table className="table table-hover table-medical-custom">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Số thứ tự khám</th>
                            <th>Chuyên khoa</th>
                            <th>Họ và tên</th>
                            <th>Lí do khám</th>
                            <th>Chẩn đoán</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Ngày</th>
                            <th>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalRecordRelative &&
                            medicalRecordRelative.length > 0 &&
                            medicalRecordRelative.map((item, index) => {
                                return (
                                    <tr key={index} onClick={() => setShow(true)}>
                                        <td>{index + 1}</td>
                                        <td>{item?.appointmentNumber}</td>
                                        <td>{item?.specialtyMR}</td>
                                        <td>{item?.Patient?.fullName}</td>
                                        <td>{item?.reason}</td>
                                        <td>{item?.diagnosis}</td>
                                        <td>{item?.Patient?.phone}</td>
                                        <td>{item?.statusMR}</td>
                                        <td>{item?.date}</td>
                                        <td>{item?.time}</td>
                                    </tr>
                                );
                            })}
                        {medicalRecordRelative && medicalRecordRelative.length === 0 && (
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

export default MedicalRecordRelative;
