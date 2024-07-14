import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
//import { deleteUser } from "../../../../services/apiService";
import { toast } from "react-toastify";
const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, setDataDelete } = props;
    const handleClose = () => {
        setShow(false);
        setDataDelete({});
    };

    const handleConfirmDelete = async () => {
        // let data = await deleteUser(dataDelete.id);

        // if (data.EC === 0) {
        //     toast.success(data.EM);
        //     handleClose();
        //     //await props.fetchListUsers();
        //     props.setCurrentPage(1);
        //     await props.fetchListUsersWithPage(1);
        // }
        // if (data.EC !== 0) {
        //     toast.error(data.EM);
        // }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the user?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete email <b>{dataDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleConfirmDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalDeleteUser;
