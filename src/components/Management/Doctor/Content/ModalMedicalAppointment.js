import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteAppointment, putExaminingDoctor } from "../../../../services/apiService";
import ModalCreatePrescription from "./ModalCreatePrescription";
import { CgCalendarDates } from "react-icons/cg";
import { FaTransgender } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { FaStethoscope } from "react-icons/fa";
const ModalCreateAppointment = (props) => {
    const { show, setShow, medicalInfo } = props;
    const [showPrescription, setShowPrescription] = useState(false);
    const handleClose = () => {
        setShow(false);
        setDiagnosis("");
    };
    const [diagnosis, setDiagnosis] = useState("");
    const [temp, setTemp] = useState("");
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

        let res = await putExaminingDoctor(data);
        if (res && res.EC === 0) {
            toast.success("Khám bệnh thành công.");
            props.getData();
            handleClose();
            setShowPrescription(true);
            setTemp(diagnosis);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    const handleDelete = async () => {
        let res = await deleteAppointment(medicalInfo.id);
        if (res && res.EC === 0) {
            toast.success("Xóa bệnh án thành công");
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
                        <div className="col-md-6 offset-md-3">
                            <span> </span>
                            <FaStethoscope />
                            <span> {medicalInfo?.MedicalRecord?.specialtyMR} </span>
                        </div>
                        <div className="col-md-6">
                            <IoPersonSharp />
                            <span> {medicalInfo?.Patient?.fullName}</span>
                        </div>

                        <div className="col-md-6">
                            <MdLocalPhone />
                            <span> {medicalInfo?.Patient?.phone}</span>
                        </div>

                        <div className="col-md-6">
                            <MdOutlineMarkEmailRead />
                            <span> {medicalInfo?.Patient?.email}</span>
                        </div>
                        <div className="col-md-6">
                            <FaTransgender />
                            <span> {medicalInfo?.Patient?.gender}</span>
                        </div>
                        <div className="col-md-6">
                            <CgCalendarDates />
                            <span> {medicalInfo?.Patient?.dateOfBirth}</span>
                        </div>
                        <div className="col-md-6">
                            <FaHome />
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
                    <Button variant="primary" onClick={() => handleDelete()}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Tiếp
                    </Button>
                </Modal.Footer>
            </Modal>
            <ModalCreatePrescription
                showPrescription={showPrescription}
                setShowPrescription={setShowPrescription}
                medicalInfo={medicalInfo}
                temp={temp}
            />
        </>
    );
};

export default ModalCreateAppointment;
