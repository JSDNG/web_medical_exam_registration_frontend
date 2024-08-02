import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putUpdatePatient, getPatientInfo } from "../../../services/apiService";
import { useEffect, useState } from "react";
import { doLogin } from "../../../redux/action/userAction";
import { useDispatch } from "react-redux";
const ModalUpdatePatientInfo = (props) => {
    const { show, setShow, account } = props;
    const [fullName, setFullName] = useState(account?.user?.fullName);
    const [dateOfBirth, setDateOfBirth] = useState(account?.user?.dateOfBirth);
    const [gender, setGender] = useState(account?.user?.gender);
    const [phone, setPhone] = useState(account?.user?.phone);
    const [address, setAddress] = useState(account?.user?.address);
    const dispatch = useDispatch();
    const handleClose = () => {
        setShow(false);
    };

    const refreshData = async () => {
        let res = await getPatientInfo(account?.user?.id);
        if (res && res.EC === 0) {
            dispatch(doLogin(res));
        }
    };
    const handleChangeDob = (dob) => {
        // Remove all non-digit characters
        dob = dob.replace(/\D/g, "");

        // Format the date as YYYY-MM-DD
        if (dob.length > 4) {
            dob = dob.slice(0, 4) + "-" + dob.slice(4);
        }
        if (dob.length > 7) {
            dob = dob.slice(0, 7) + "-" + dob.slice(7);
        }

        // Limit to 10 characters (YYYY-MM-DD)
        if (dob.length > 10) {
            dob = dob.slice(0, 10);
        }
        setDateOfBirth(dob);
    };
    const handleChangePhone = (phone) => {
        // Xóa tất cả các ký tự không phải là số
        const cleanedValue = phone.replace(/[^0-9]/g, "");

        // Giới hạn số ký tự nhập vào là 10
        if (cleanedValue.length <= 10) {
            setPhone(cleanedValue);
        }
    };
    const isValidDate = (dateString) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (!regex.test(dateString)) {
            return false;
        }

        const parts = dateString.split("-");
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);

        const currentYear = new Date().getFullYear();

        // Additional validations
        if (year > currentYear || month < 1 || month > 12 || day < 1 || day > 31) {
            return false;
        }

        const date = new Date(year, month - 1, day);

        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            return false;
        }

        return true;
    };
    const handleSubmitUpdate = async () => {
        if (!fullName) {
            toast.error("Vui lòng điền họ tên!");
            return;
        }
        if (!isValidDate(dateOfBirth)) {
            toast.error("Ngày sinh không hợp lệ!");
            return;
        }
        let data = {
            id: account?.user?.id,
            fullName: fullName,
            gender: gender,
            phone: phone,
            dateOfBirth: dateOfBirth,
            address: address,
        };
        console.log(data);
        let res = await putUpdatePatient(data);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            refreshData();
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
                size="lg"
                backdrop="static"
                className="modal-update-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật thông tin cá nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <div className="col-md-6">
                            <label className="form-label">Họ tên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giới tính</label>
                            <select
                                className="form-select"
                                onChange={(event) => setGender(event.target.value)}
                                value={gender}
                            >
                                <option value="Nữ">Nữ</option>
                                <option value="Nam">Nam</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ngày sinh ("YYYY-MM-DD")</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dateOfBirth}
                                onChange={(event) => handleChangeDob(event.target.value)}
                                placeholder="Ví dụ: 2000-01-01"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(event) => handleChangePhone(event.target.value)}
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
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmitUpdate()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdatePatientInfo;
