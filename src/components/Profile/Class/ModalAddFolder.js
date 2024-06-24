import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFolder } from "../../../services/apiService";
const ModalAddFolder = (props) => {
    const { showFolder, setShowFolder } = props;
    const handleClose = () => setShowFolder(false);
    const [infoFolder, setInfoFolder] = useState("");
    const [arrFolder, setArrFolder] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let res = await getAllFolder();
        if (res && res.EC === 0) {
            setArrFolder(res.DT);
        }
    };
    const handleAddFolderNew = () => {
        setShowFolder(false);
        //console.log(title, desc);
    };
    const handleAddOrDeleteFolder = () => {
        setShowFolder(false);
        //console.log(title, desc);
    };
    return (
        <>
            <Modal
                show={showFolder}
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
                            <Button variant="primary" onClick={() => handleAddFolderNew()}>
                                Tạo thư mục mới
                            </Button>
                            <div
                                //key={`${index}-folder`}
                                className="folder-content card"
                                //onClick={() => navigate(`/folders/${item.id}`)}
                            >
                                <div className="folder-header-text">
                                    <span> học phần</span>
                                </div>
                                <div className="folder-body-content">
                                    <Button variant="primary" onClick={() => handleAddOrDeleteFolder()}>
                                        THêm
                                    </Button>
                                    <Button variant="primary" onClick={() => handleAddOrDeleteFolder()}>
                                        Xóa
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalAddFolder;
