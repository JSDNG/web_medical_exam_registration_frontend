import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//import "./ModalCreatePrescription.scss";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
const ModalCreatePrescription = (props) => {
    const { showPrescription, setShowPrescription, medicalInfo, diagnosis } = props;
    const [PrescriptionIndex, SetPrescriptionIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const handleClose = () => {
        setShowPrescription(false);
    };
    const [arrPrescription, setArrPrescription] = useState([
        {
            id: uuidv4(),
            medicationName: "",
            price: "",
            quantity: "",
            instruction: "",
            doctorId: "",
            recordId: "",
        },
    ]);
    const doctorId = useSelector((state) => state?.user?.account?.id);
    const handleSubmit = async (event) => {
        let arrClone = _.cloneDeep(arrPrescription);
        arrClone = arrClone.filter(
            (item) => item.medicationName === "" || item.price === "" || item.quantity === "" || item.instruction === ""
        );
        if (arrClone.length > 0) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        let data = {
            prescriptions: arrPrescription,
        };
        data.prescriptions.forEach((prescription) => {
            delete prescription.id;
        });

        // let res = await postCreateNewSet(data);
        // if (res && res.ec === 201) {
        //     toast.success(res.em);
        //     navigate(`/flash-Prescriptions/${res.dt.id}`);
        // }
        // if (res && +res.ec !== 201) {
        //     toast.error(res.em);
        // }
    };
    const handleAddDeletePrescription = (type, id) => {
        if (type === "ADD") {
            let newPrescription = {
                id: uuidv4(),
                term: "",
                definition: "",
            };
            setArrPrescription([...arrPrescription, newPrescription]);
        }
        if (type == "DELETE") {
            let arrClone = _.cloneDeep(arrPrescription);
            arrClone = arrClone.filter((item) => item.id !== id);
            setArrPrescription(arrClone);
        }
    };
    const handleChangePhone = (quantity) => {
        // Xóa tất cả các ký tự không phải là số
        const cleanedValue = quantity.replace(/[^0-9]/g, "");
    };

    const handelOnChange = (type, id, value) => {
        if (type === "medicationName" || type === "instruction" || type === "quantity") {
            let arrPrescriptionClone = _.cloneDeep(arrPrescription);
            let index = arrPrescriptionClone.findIndex((item) => item.id == id);
            if (index > -1) {
                arrPrescriptionClone[index][type] = value;
                setArrPrescription(arrPrescriptionClone);
            }
        }
    };
    return (
        <>
            <Modal
                show={true}
                onHide={handleClose}
                animation={false}
                size="xl"
                backdrop="static"
                className="modal-prescription"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="col-md-6 offset-md-3">Toa thuốc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        {/* <label className="offset-lg-6" style={{ fontSize: "18px" }}>
                            Toa thuốc
                        </label> */}
                        <div className="col-md-6">
                            <label>Họ tên: </label>
                            <span> {medicalInfo?.Patient?.fullName}</span>
                        </div>
                        <div className="col-md-6">
                            <label>Giới: </label>
                            <span> {medicalInfo?.Patient?.gender}</span>
                            <label>, Năm sinh: </label>
                            <span> {medicalInfo?.Patient?.dateOfBirth.split("-")[0]}</span>
                        </div>
                        <div className="col-md-6">
                            <label>Số điện thoại: </label>
                            <span> {medicalInfo?.Patient?.phone}</span>
                        </div>

                        <div className="col-md-6">
                            <label>Email: </label>
                            <span> {medicalInfo?.Patient?.email}</span>
                        </div>
                        <div className="col-md-12">
                            <label>Địa chỉ: </label>
                            <span> {medicalInfo?.Patient?.address}</span>
                        </div>
                        <div className="col-md-12">
                            <label>Chuẩn đoán: </label>
                            <span value={diagnosis} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Thuốc điều trị: </label>

                            {arrPrescription &&
                                arrPrescription.length > 0 &&
                                arrPrescription.map((item, index) => {
                                    return (
                                        <div key={`${index}-prescription`} className="prescription-main-container">
                                            <div className="prescriptions-content container">
                                                <div>
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="col-md-6 card-prescription-custom">
                                                    <div>
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Tên thuốc"
                                                            value={item.medicationName}
                                                            onChange={(event) =>
                                                                handelOnChange(
                                                                    "medicationName",
                                                                    item.id,
                                                                    event.target.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Hướng dẫn"
                                                            value={item.instruction}
                                                            onChange={(event) =>
                                                                handelOnChange("instruction", item.id, event.target)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="prescription-price-custom">
                                                    <input
                                                        type="text"
                                                        className="form-control "
                                                        placeholder="Số lượng"
                                                        value={item.quantity}
                                                        // onChange={(event) =>
                                                        //     handelOnChange("quantity", item.id, event.target.value.replace(/[^0-9]/g, ""))
                                                        // }
                                                    />
                                                </div>
                                                <div className="prescription-header-1 container">
                                                    {arrPrescription.length > 1 && (
                                                        <Button
                                                            className="btn btn-danger"
                                                            onClick={() =>
                                                                handleAddDeletePrescription("DELETE", item.id)
                                                            }
                                                        >
                                                            Xóa
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleAddDeletePrescription("ADD", "")}>
                        Thêm thuốc
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreatePrescription;
