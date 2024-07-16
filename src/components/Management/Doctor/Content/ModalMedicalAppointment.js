import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { putExaminingDoctor } from "../../../../services/apiService";
const ModalCreateAppointment = (props) => {
    const { show, setShow, medicalInfo } = props;
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    const handleClose = () => {
        setShow(false);
        setDiagnosis("");
    };
    const [status, setStatus] = useState(true);
    const [diagnosis, setDiagnosis] = useState("");

    const handleSubmit = async () => {
        if (!diagnosis) {
            toast.error("Vui lòng chuẩn đoán bệnh án!");
            return;
        }
        let data = {
            appointment: {
                id: medicalInfo?.id,
                statusId: 3,
            },
            medicalRecord: {
                id: medicalInfo?.MedicalRecord?.id,
                diagnosis: diagnosis,
                statusId: 7,
            },
        };
        console.log(medicalInfo);
        let res = await putExaminingDoctor(data);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            props.getData();
            handleClose();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size="md"
                backdrop="static"
                className="modal-medical-appointment"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Khám bệnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Bệnh nhân:</label>
                            <span> {medicalInfo?.Patient?.fullName} </span>
                            <label className="form-label">- Chuyên khoa:</label>
                            <span> {medicalInfo?.MedicalRecord?.specialtyMR} </span>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại:</label>
                            <span> {medicalInfo?.Patient?.phone}</span>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Email:</label>
                            <span> {medicalInfo?.Patient?.email}</span>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giới tính:</label>
                            <span> {medicalInfo?.Patient?.gender}</span>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ngày sinh:</label>
                            <span> {medicalInfo?.Patient?.dateOfBirth}</span>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Địa chỉ:</label>
                            <span> {medicalInfo?.Patient?.address}</span>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Lí do khám:</label>
                            <span> {medicalInfo?.MedicalRecord?.reason}</span>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Lịch sử bệnh án: </label>
                            <span> {medicalInfo?.MedicalRecord?.medicalHistory}</span>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Chuẩn đoán: </label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={diagnosis}
                                onChange={(event) => setDiagnosis(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateAppointment;
