import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putAppointment, deleteAppointment } from "../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import { CgCalendarDates } from "react-icons/cg";
import { BiHourglass } from "react-icons/bi";
import { FaTransgender } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { FaStethoscope } from "react-icons/fa";
const ModalApproveAppointment = (props) => {
    const { show, setShow, data } = props;
    const account = useSelector((state) => state?.user?.account);
    const handleClose = () => {
        setShow(false);
    };
    const handleSubmitApproveAppointment = async (status) => {
        if (status === "delete") {
            let res = await deleteAppointment(data?.id);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                props.getData();
                handleClose();
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM);
            }
        } else if (status === "approve") {
            let res = await putAppointment({
                id: data?.id,
                statusId: 2,
                staffId: account?.user?.id,
            });
            if (res && res.EC === 0) {
                toast.success(res.EM);
                props.getData();
                handleClose();
            }
            if (res && res.EC !== 0) {
                toast.error(res.EM);
            }
        }
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
                    <Modal.Title>Phê duyệt lịch khám bệnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="row">
                            <label className="offset-md-3" style={{ fontSize: "18px" }}>
                                Thông tin lịch khám bệnh
                            </label>
                            <div className="col-md-6 ">
                                <FaStethoscope />
                                <span className="form-label"> {data?.MedicalRecord?.specialtyMR}</span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">Số thứ tự: {data?.appointmentNumber}</span>
                            </div>
                            <div className="col-md-6 ">
                                <CgCalendarDates />
                                <span className="form-label"> {data?.date}</span>
                            </div>
                            <div className="col-md-6">
                                <BiHourglass />
                                <span className="form-label"> {data?.time}</span>
                            </div>
                        </div>
                        <div className="row">
                            <label className="offset-md-3" style={{ fontSize: "18px" }}>
                                Thông tin bệnh nhân
                            </label>
                            <div className="col-md-6">
                                <IoPersonSharp />
                                <span className="form-label"> {data?.Patient?.fullName}</span>
                            </div>
                            <div className="col-md-6">
                                <MdLocalPhone />
                                <span className="form-label"> {data?.Patient?.phone}</span>
                            </div>
                            <div className="col-md-6">
                                <MdOutlineMarkEmailRead />
                                <span className="form-label"> {data?.Patient?.email}</span>
                            </div>
                            <div className="col-md-6">
                                <FaTransgender />
                                <span className="form-label"> {data?.Patient?.gender}</span>
                            </div>
                            <div className="col-md-6">
                                <CgCalendarDates />
                                <span className="form-label"> {data?.Patient?.dateOfBirth}</span>
                            </div>
                            <div className="col-md-6">
                                <FaHome />
                                <span className="form-label"> {data?.Patient?.address} </span>
                            </div>
                            <div className="col-md-6">
                                <span className="form-label">Lí do khám: {data?.MedicalRecord?.reason} </span>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmitApproveAppointment("delete")}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitApproveAppointment("approve")}>
                        Duyệt
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalApproveAppointment;
