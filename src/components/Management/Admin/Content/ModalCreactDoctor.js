import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { postRegister } from "../../../../services/apiService";
const ModalCreactDoctor = (props) => {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setFullName("");
        setPhone("");
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleChangePhone = (phone) => {
        // Xóa tất cả các ký tự không phải là số
        const cleanedValue = phone.replace(/[^0-9]/g, "");

        // Giới hạn số ký tự nhập vào là 10
        if (cleanedValue.length <= 10) {
            setPhone(cleanedValue);
        }
    };
    const handleSubmitCreactDoctor = async () => {
        //validate
        const inValidEmail = validateEmail(email);
        if (!fullName) {
            toast.error("Vui lòng nhập họ tên bác sĩ !");
            return;
        }

        if (!phone) {
            toast.error("Vui lòng nhập số điện thoại !");
            return;
        }
        if (!inValidEmail) {
            toast.error("Vui lòng nhập email hợp lệ!");
            return;
        }

        if (!password) {
            toast.error("Vui lòng nhập mật khẩu !");
            return;
        }
        if (password.length < 6) {
            toast.error("Vui lòng nhập mật khẩu tối thiểu 6 ký tự !");
            return;
        }

        let res = await postRegister({ email, password, accountType: "MedicalStaff", fullName, phone, roleId: 2 });

        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            props.fetchDoctorList();
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
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới bác sĩ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">Họ tên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(event) => handleChangePhone(event.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="abc@gmail.com"
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                autoComplete="off"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmitCreactDoctor()}>
                        Tạo
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreactDoctor;
