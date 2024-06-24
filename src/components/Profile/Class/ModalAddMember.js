import { useState } from "react";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";

const ModalAddMember = (props) => {
    const { showMember, setShowMember } = props;
    const handleClose = () => setShowMember(false);

    const [infoMember, setInfoMember] = useState("");

    const handleAddMember = () => {
        setShowMember(false);
        //console.log(title, desc);
    };
    return (
        <>
            <Modal
                show={showMember}
                onHide={handleClose}
                animation={false}
                size="lg"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Mời thành viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">
                                Để mời thành viên tham gia lớp học này, hãy nhập tên người dùng hoặc email Quizlet của
                                họ bên dưới (phân tách bằng dấu phẩy hoặc ngắt dòng).
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={infoMember}
                                onChange={(event) => setInfoMember(event.target.value)}
                                placeholder="Nhập tên người dùng hoặc email"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleAddMember()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalAddMember;
