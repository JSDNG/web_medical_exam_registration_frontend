import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { postSendEmailInvoice } from "../../../../services/apiService";
import { useSelector } from "react-redux";
import { Buffer } from "buffer/";

const ModalSendEmailInvoice = (props) => {
    const { show, setShow, data } = props;
    const [imageBase64, setImageBase64] = useState("");
    const account = useSelector((state) => state?.user?.account);
    const handleClose = () => {
        setShow(false);
    };
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Corrected this line
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = window.URL.createObjectURL(file);
            //console.log(objectUrl);

            let base64 = await getBase64(file);
            setImageBase64(base64);
            // console.log(base64);
        }
    };
    const handleSubmit = async () => {
        if (!imageBase64) {
            toast.error("Vui lòng chọn hóa đơn !");
            return;
        }
        let result = {
            email: data?.Patient?.email,
            patientName: data?.Patient?.fullName,
            file: imageBase64,
            doctorId: account?.user?.id,
            recordId: data?.MedicalRecord?.id,
        };
        let res = await postSendEmailInvoice(result);
        if (res && res.EC === 0) {
            toast.success(res.EM);
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
                className="modal-send-email-invoice"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Gửi hóa đơn khám bệnh qua email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email bệnh nhân </label>
                            <span>{data?.Patient?.email}</span>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Chọn file hóa đơn</label>
                            <input type="file" onChange={(event) => handleOnchangeImg(event)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Gửi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalSendEmailInvoice;
