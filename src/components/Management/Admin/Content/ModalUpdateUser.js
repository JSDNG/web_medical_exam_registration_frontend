import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../../services/apiService";
import _ from "lodash";
const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;

    const handleClose = () => {
        setDataUpdate({});
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

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
        }
    }, [dataUpdate]);

    const handleSubmitUpdateUser = async () => {
        //validate
        if (!username) {
            toast.error("invalid username");
            return;
        }

        let data = await putUpdateUser(dataUpdate.id, username, role, image);

        //console.log(">>>> data", data);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUsersWithPage(props.currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
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
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                autoComplete="off"
                                value={password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Role</label>
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateUser;
