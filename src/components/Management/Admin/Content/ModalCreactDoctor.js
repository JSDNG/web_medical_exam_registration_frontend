import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
//import { postCreacteNewUser } from "../../../../services/apiService";
const ModalCreactDoctor = (props) => {
    const { show, setShow } = props;

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
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

    const handleSubmitCreactDoctor = async () => {
        //validate
        const inValidEmail = validateEmail(email);

        if (!inValidEmail) {
            toast.error("invalid email");
            return;
        }

        if (!password) {
            toast.error("invalid password");
            return;
        }

        if (!username) {
            toast.error("invalid username");
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
                show={show}
                onHide={handleClose}
                animation={false}
                size="xl"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới bác sĩ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
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
                        <div className="col-md-6">
                            <label className="form-label">Họ tên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Nhân viên y tế</label>
                            <select
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
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
                    <Button variant="primary" onClick={() => handleSubmitCreactDoctor()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreactDoctor;
