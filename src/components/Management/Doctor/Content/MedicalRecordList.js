import { useState, useEffect } from "react";
import { getAllAppointmentFromDoctor, getAllInvoiceByDoctorId } from "../../../../services/apiService";
import ModalSendEmailInvoice from "./ModalSendEmailInvoice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalReExamination from "./ModalReExamination";
const MedicalRecordList = (props) => {
    const [medicalRecordList, setMedicalRecordList] = useState([]);
    const [invoiceList, setInvoiceList] = useState([]);
    const [show, setShow] = useState(false);
    const [showReExamination, setShowReExamination] = useState(false);
    const [data, setData] = useState({});
    const [data1, setData1] = useState({});
    const account = useSelector((state) => state?.user?.account);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let res = await getAllAppointmentFromDoctor(account?.user?.id, 3);
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
    const handleClickReExamination = (item) => {
        setShowReExamination(true);
        setData1(item);
    };
    return (
        <div className="medical-record-list-container-manage-custom">
            <div className="medical-record-list-header-manage-custom">
                <span className="title-custom">DANH SÁCH BỆNH ÁN ĐÃ KHÁM</span>
            </div>
            <div className="medical-record-list-body-manage-custom">
                <table className="table table-hover table-medical-custom">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Chuyên khoa</th>
                            <th>Họ và tên</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Thời gian</th>
                            <th>Ngày</th>
                            <th width="250px">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicalRecordList &&
                            medicalRecordList.length > 0 &&
                            medicalRecordList.map((item, index) => {
                                return (
                                    <tr key={index} onClick={() => handleClick(item)}>
                                        <td>{index + 1}</td>
                                        <td>{item?.MedicalRecord?.specialtyMR}</td>
                                        <td>{item?.Patient?.fullName}</td>
                                        <td>{item?.Patient?.phone}</td>
                                        <td>{item?.statusAM}</td>
                                        <td>{item?.time}</td>
                                        <td>{item?.date}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary "
                                                onClick={() => handleClickInvoice(item?.MedicalRecord?.id)}
                                            >
                                                Gửi hóa đơn
                                            </button>
                                            <button
                                                className="btn btn-primary mx-3"
                                                onClick={() => handleClickReExamination(item)}
                                            >
                                                Tái khám
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
                <ModalSendEmailInvoice show={show} setShow={setShow} data={data} getData={getData} />
                <ModalReExamination
                    showReExamination={showReExamination}
                    setShowReExamination={setShowReExamination}
                    data={data1}
                    getData={getData}
                />
            </div>
        </div>
    );
};

export default MedicalRecordList;
