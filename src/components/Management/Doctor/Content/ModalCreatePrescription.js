import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { toast } from "react-toastify";
import { getAllMedication, postPrescription } from "../../../../services/apiService";
import ReactToPrint from "react-to-print";
import moment from "moment";
import { GiWingfoot } from "react-icons/gi";
const ModalCreatePrescription = (props) => {
    const { showPrescription, setShowPrescription, medicalInfo, temp } = props;
    const [medicationList, setMedicationList] = useState([]);
    const [showInvoice, setShowInvoice] = useState(false);
    const account = useSelector((state) => state?.user?.account);
    let date = moment(new Date(Date.now())).format("YYYY-MM-DD");
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `Ngày ${day} tháng ${month} năm ${year}`;
    };
    const formattedDate = formatDate(date);
    const [invoice, setInvoice] = useState({});
    const componentRef = useRef();

    const handleClose = () => {
        setShowPrescription(false);
    };
    const [arrPrescription, setArrPrescription] = useState([]);

    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllMedication();
        if (res && res.EC === 0) {
            setMedicationList(res.DT);
        }
        if (res && res.EC !== 0) {
            console.log("err");
        }
    };
    const handleAddDeletePrescription = (type, id) => {
        let index = arrPrescription.findIndex((item) => item.medicationId === +id);
        console.log("index", index);
        if (index > -1) {
            return;
        }
        if (type === "ADD") {
            let newPrescription = {
                id: uuidv4(),
                medicationName: medicationList[id - 1]?.medicationName,
                instruction: "",
                quantity: "",
                medicationId: +id,
            };
            setArrPrescription([...arrPrescription, newPrescription]);
        }
        if (type === "DELETE") {
            let arrClone = _.cloneDeep(arrPrescription);
            arrClone = arrClone.filter((item) => item.id !== id);
            setArrPrescription(arrClone);
        }
    };
    const handelOnChange = (type, id, value) => {
        if (type === "medicationName" || type === "instruction" || type === "quantity") {
            let arrPrescriptionClone = _.cloneDeep(arrPrescription);
            let index = arrPrescriptionClone.findIndex((item) => item.id === id);
            if (index > -1) {
                arrPrescriptionClone[index][type] = value;
                setArrPrescription(arrPrescriptionClone);
            }
        }
    };
    const handleSubmit = async (event) => {
        let arrClone = _.cloneDeep(arrPrescription);
        arrClone = arrClone.filter(
            (item) => item.medicationName === "" || item.price === "" || item.quantity === "" || item.instruction === ""
        );
        if (arrClone.length > 0) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        arrPrescription.forEach((prescription) => {
            delete prescription.id;
            delete prescription.medicationName;
        });
        let data = {
            doctorId: account?.user?.id,
            recordId: medicalInfo?.MedicalRecord?.id,
            prescriptionDetail: arrPrescription,
        };
        console.log(data);
        let res = await postPrescription(data);
        if (res && res.EC === 0) {
            toast.success("Tạo toa thuốc thành công.");
            setShowInvoice(true);
            setInvoice(res.DT);
            handleClose();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    return (
        <>
            <Modal
                show={showPrescription}
                //onHide={handleClose}
                //animation={false}
                size="lg"
                backdrop="static"
                className="modal-prescription"
            >
                <Modal.Header>
                    <Modal.Title>Toa thuốc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
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
                            <span> {temp}</span>
                        </div>
                        <div className="col-md-12">
                            <div className="medication-custom">
                                <label className="form-label">Thuốc điều trị: </label>
                                <select
                                    className="form-select pick-medication-custom"
                                    onChange={(event) => handleAddDeletePrescription("ADD", event.target.value)}
                                >
                                    {medicationList &&
                                        medicationList.length > 0 &&
                                        medicationList.map((item, index) => (
                                            <option key={`${index}-a`} value={item.id}>
                                                {item.medicationName}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            {arrPrescription &&
                                arrPrescription.length > 0 &&
                                arrPrescription.map((item, index) => {
                                    return (
                                        <div key={`${index}-prescription`} className="prescription-main-container">
                                            <div className="prescriptions-content container">
                                                <span>{index + 1}</span>

                                                <div className="col-md-6 card-prescription-custom">
                                                    <div>
                                                        <span>{item.medicationName} </span>
                                                    </div>
                                                    <div>
                                                        <textarea
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Hướng dẫn"
                                                            value={item.instruction}
                                                            onChange={(event) =>
                                                                handelOnChange(
                                                                    "instruction",
                                                                    item.id,
                                                                    event.target.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="prescription-quantity-custom">
                                                    <input
                                                        type="number"
                                                        className="form-control "
                                                        value={item.quantity}
                                                        onChange={(event) =>
                                                            handelOnChange(
                                                                "quantity",
                                                                item.id,
                                                                +event.target.value.replace(/[^0-9]/g, "")
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="prescription-header-1">
                                                    <Button
                                                        className="btn btn-danger"
                                                        onClick={() => handleAddDeletePrescription("DELETE", item.id)}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowInvoice(true)}>
                        Bỏ qua
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Tiếp
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showInvoice}
                onHide={handleClose}
                animation={false}
                size="lg"
                backdrop="static"
                className="modal-invoice"
            >
                <Modal.Body>
                    <form ref={componentRef} className="row g-3 m-2">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center" style={{ maxWidth: "350px" }}>
                                <GiWingfoot style={{ fontSize: "90px", color: "#2bc740" }} />
                                <span style={{ fontSize: "25px", fontWeight: "500" }}>
                                    {" "}
                                    Phòng khám tư nhân HealthBooking
                                </span>
                            </div>
                            <div className="d-flex flex-column" style={{ maxWidth: "300px" }}>
                                <span>Địa chỉ: 97 Man Thiện, phường Hiệp Phú, TP Thủ Đức</span>
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                        <label className="d-flex justify-content-center" style={{ fontSize: "30px", fontWeight: 600 }}>
                            HÓA ĐƠN
                        </label>
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
                        <div className="col-md-6">
                            <label>Bác sĩ điều trị chính: </label>
                            <span> {account?.user?.fullName}</span>
                        </div>
                        <div className="col-md-6">
                            <label>Chuyên khoa: </label>
                            <span> {medicalInfo?.MedicalRecord?.specialtyMR}</span>
                        </div>
                        <div className="col-md-12">
                            <label>Chuẩn đoán: </label>
                            <span> {temp}</span>
                        </div>
                        <div className="col-md-12">
                            {invoice && invoice?.medications?.length > 0 ? (
                                <>
                                    <label className="form-label">Thuốc điều trị: </label>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Thuốc/Hướng dẫn sử dụng</th>
                                                <th>Số lượng</th>
                                                <th>Đơn giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoice &&
                                                invoice?.medications?.length > 0 &&
                                                invoice?.medications?.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {item?.medicationName}
                                                                <br /> {item?.instruction}
                                                            </td>

                                                            <td>{item?.quantity}</td>
                                                            <td>{item?.price} đ</td>
                                                        </tr>
                                                    );
                                                })}
                                            <tr>
                                                <td colSpan="4" className="text-right">
                                                    <div className="d-flex justify-content-between">
                                                        <span>Giá khám:</span>
                                                        <span>{account?.user?.price} đ</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="4" className="text-right">
                                                    <div className="d-flex justify-content-between">
                                                        <span>Tổng:</span>
                                                        <span>{invoice?.total} đ</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            ) : (
                                <>
                                    <div className="d-flex justify-content-between">
                                        <span>Giá khám:</span>
                                        <span>{account?.user?.price} đ</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <span>Tổng:</span>
                                        <span>{account?.user?.price} đ</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <ReactToPrint
                        trigger={() => <Button variant="primary">Xuất hóa đơn</Button>}
                        content={() => componentRef.current}
                        onAfterPrint={() => setShowInvoice(false)}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreatePrescription;
