import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putAppointment, deleteAppointment } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
const ModalSendMail = (props) => {
    const { show, setShow, data } = props;
    const account = useSelector((state) => state?.user?.account);
    const handleClose = () => {
        setShow(false);
    };
    const handleSubmitApproveAppointment = async () => {
        setShow(false);
        // let res = await putAppointment({
        //     id: data?.id,
        //     statusId: 2,
        //     staffId: account?.user?.id,
        // });
        // if (res && res.EC === 0) {
        //     toast.success(res.EM);
        //     props.getData();
        //     handleClose();
        // }
        // if (res && res.EC !== 0) {
        //     toast.error(res.EM);
        // }
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size="lg"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đặt lịch khám nhanh trong ngày</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="row">
                            <label className="offset-md-3">Thông tin lịch khám bệnh</label>
                            <div className="col-md-6 ">
                                <span className="form-label">Chuyên khoa: {data?.MedicalRecord?.specialtyMR}</span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">Số thứ tự khám: {data?.appointmentNumber}</span>
                            </div>
                            <div className="col-md-6 ">
                                <span className="form-label">Ngày khám: {data?.date}</span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">Giờ khám: {data?.time}</span>
                            </div>
                        </div>
                        <div className="row">
                            <label className="offset-md-3">Thông tin bệnh nhân</label>
                            <div className="col-md-6">
                                <span className="form-label">Họ tên bệnh nhân: {data?.Patient?.fullName}</span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">Số điện thoại: {data?.Patient?.phone}</span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">Email: {data?.Patient?.email}</span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">Giới tính: {data?.Patient?.gender}</span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">Ngày sinh: {data?.Patient?.dateOfBirth}</span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">Địa chỉ: {data?.Patient?.address} </span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">Lí do khám: {data?.MedicalRecord?.reason} </span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">
                                    Lịch sử bệnh án: {data?.MedicalRecord?.medicalHistory}
                                </span>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitApproveAppointment()}>
                        Gửi email
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalSendMail;
