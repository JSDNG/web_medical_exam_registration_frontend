import { useState, useEffect } from "react";
import { getAllAppointmentById } from "../../../../services/apiService";
const MedicalRecordList = (props) => {
    const [MedicalRecordList, setMedicalRecordList] = useState([]);
    const [data, setData] = useState({});
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllAppointmentById(2);
        if (res && res.EC === 0) {
            setMedicalRecordList(res.DT);
        }
    };
    const handleClick = (data) => {
        setData(data);
    };
    return (
        <div className="medical-record-list-container-manage-custom">
            <div className="medical-record-list-header-manage-custom">
                <span className="title-custom">DANH SÁCH BỆNH ÁN ĐÃ KHÁM</span>
            </div>
            <div className="medical-record-list-body-manage-custom">
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
                        {MedicalRecordList &&
                            MedicalRecordList.length > 0 &&
                            MedicalRecordList.map((item, index) => {
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
                        {MedicalRecordList && MedicalRecordList.length === 0 && (
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

export default MedicalRecordList;
