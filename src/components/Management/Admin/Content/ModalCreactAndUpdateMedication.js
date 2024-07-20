import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { postMedication, putMedication } from "../../../../services/apiService";
const ModalCreateAndUpdateMedication = (props) => {
    const { show, setShow, medicationDetail } = props;
    const [medicationName, setMedicationName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const handleClose = () => {
        setShow(false);
        setMedicationName("");
        setDescription("");
        setPrice("");
    };
    console.log(medicationDetail);
    useEffect(() => {
        setDescription(medicationDetail?.description);
        setMedicationName(medicationDetail?.medicationName);
        setPrice(medicationDetail?.price);
    }, [medicationDetail]);

    const handleSubmit = async () => {
        if (!medicationName || !description || !price) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }

        const data = {
            medicationName: medicationName,
            price: price,
            description: description,
        };

        if (medicationDetail && Object.keys(medicationDetail).length !== 0) {
            data.id = medicationDetail.id;
        }

        try {
            let res =
                medicationDetail && Object.keys(medicationDetail).length !== 0
                    ? await putMedication(data)
                    : await postMedication(data);

            if (res && res.EC === 0) {
                toast.success(res.EM);
                handleClose();
                props.getData();
            } else if (res && res.EC !== 0) {
                toast.error(res.EM);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            console.error(error);
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
                className="modal-medication"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thuốc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <div className="col-md-12">
                            <label className="form-label">Tên thuốc</label>
                            <input
                                type="text"
                                className="form-control"
                                value={medicationName}
                                onChange={(event) => setMedicationName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Giá</label>
                            <input
                                type="text"
                                className="form-control"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Mô tả</label>
                            <textarea
                                type="text"
                                className="form-control text-area-Medication-custom"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
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

export default ModalCreateAndUpdateMedication;
