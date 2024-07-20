import { useState, useEffect } from "react";
import { getAllAppointmentById, getAllInvoiceByDoctorId } from "../../../../services/apiService";
import ModalSendEmailInvoice from "./ModalSendEmailInvoice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const MedicalRecordList = (props) => {
    const [medicalRecordList, setMedicalRecordList] = useState([]);
    const [invoiceList, setInvoiceList] = useState([]);
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const account = useSelector((state) => state?.user?.account);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let res = await getAllAppointmentById(3);
        if (res && res.EC === 0) {
            setMedicalRecordList(res.DT);
        }
        let res1 = await getAllInvoiceByDoctorId(account?.user?.id);
        if (res1 && res1.EC === 0) {
            setInvoiceList(res1.DT);
        }
    };
    const handleClick = (data) => {
        setData(data);
    };
    const handleClickInvoice = (id) => {
        let index = invoiceList.findIndex((item) => item.recordId === id);
        if (index > -1) {
            toast.warning("Hóa đơn đã gửi cho bệnh nhân!");
            return;
        }
        setShow(true);
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
                            <th>STT</th>
                            <th>Chuyên khoa</th>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Thời gian</th>
                            <th>Ngày</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalRecordList &&
                            medicalRecordList.length > 0 &&
                            medicalRecordList.map((item, index) => {
                                return (
                                    <tr key={index} onClick={() => handleClick(item)}>
                                        <td>{index + 1}</td>
                                        <td>{item?.appointmentNumber}</td>
                                        <td>{item?.MedicalRecord?.specialtyMR}</td>
                                        <td>{item?.Patient?.fullName}</td>
                                        <td>{item?.Patient?.phone}</td>
                                        <td>{item?.statusAM}</td>
                                        <td>{item?.time}</td>
                                        <td>{item?.date}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleClickInvoice(item?.MedicalRecord?.id)}
                                            >
                                                Gửi hóa đơn
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        {medicalRecordList && medicalRecordList.length === 0 && (
                            <tr>
                                <td colSpan={"10"}>Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <ModalSendEmailInvoice show={show} setShow={setShow} data={data} />
            </div>
        </div>
    );
};

export default MedicalRecordList;
