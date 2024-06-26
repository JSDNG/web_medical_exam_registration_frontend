import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
const ModalCreateAppointment = (props) => {
    const { showAppointment, setShowAppointment } = props;

    const handleClose = () => {
        setShowAppointment(false);
        setEmail("");

    };
    const [specialtyName, setSpecialtyName] = useState("");
    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("Nam");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [reason, setReason] = useState("");

    // const [previewImage, setPreviewImage] = useState("");
    // const handleUploadImage = (event) => {
    //     setPreviewImage("");
    //     setImage("");
    //     setPreviewImage(URL.createObjectURL(event.target.files[0]));
    //     console.log(">>>", event.target.files[0]);
    // };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmitCreactUser = async () => {
        //validate
        const inValidEmail = validateEmail(email);

        if (!inValidEmail) {
            toast.error("invalid email");
            return;
        }


        // let data = await postCreacteNewUser(email, password, username, role, image);

        // if (data && data.EC === 0) {
        //     toast.success(data.EM);
        //     handleClose();
        //     //await props.fetchListUsers();
        //     props.setCurrentPage(1);
        //     await props.fetchListUsersWithPage(1);
        // }
        // if (data && data.EC !== 0) {
        //     toast.error(data.EM);
        // }
    };
    return (
        <>
            <Modal
                show={showAppointment}
                onHide={handleClose}
                animation={false}
                size="xl"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đặt lịch khám</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Họ tên bệnh nhân (bắt buộc)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                        </div>
                        
                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">ngày sinh</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dob}
                                onChange={(event) => setDob(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                        {/* <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div> */}
                        {/* <div className="col-md-12">
                            <label className="form-label">Upload file image</label>
                            <input type="file" onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ? <img src={previewImage} /> : <span>image</span>}
                        </div> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmitCreactUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateAppointment;
