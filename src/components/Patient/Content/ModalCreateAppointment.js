import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../../redux/action/userAction";
import { postCreateAppointment, putUpdatePatient, getAllRelative, getPatientInfo } from "../../../services/apiService";
const ModalCreateAppointment = (props) => {
    const {
        showAppointment,
        setShowAppointment,
        specialties,
        scheduleId,
        doctorId,
        doctorInfor,
        time,
        dateList,
        index,
    } = props;
    const dispatch = useDispatch();
    const account = useSelector((state) => state?.user?.account);
    const [relativeList, setRelativeList] = useState([]);
    const [relativeId, setRelativeId] = useState("");
    const [status, setStatus] = useState(true);
    const [specialtyId, setSpecialtyId] = useState("");
    const [fullName, setFullName] = useState(account?.user?.fullName);
    const [gender, setGender] = useState(account?.user?.gender);
    const [phone, setPhone] = useState(account?.user?.phone);
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(account?.user?.dateOfBirth);
    const [address, setAddress] = useState(account?.user?.address);
    const [reason, setReason] = useState("");
    const [medicalHistory, setMedicalHistory] = useState("");
    const handleRefresh = () => {
        setRelativeId("");
        setFullName("");
        setAddress("");
        setEmail("");
        setGender("Nữ");
        setPhone("");
        setDateOfBirth("");
        setSpecialtyId(specialties?.[0]?.id);
        setReason("");
        setMedicalHistory("");
    };

    const handleClose = () => {
        setShowAppointment(false);
        setStatus(true);
        setReason("");
        setMedicalHistory("");
        setSpecialtyId(specialties?.[0]?.id);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (status === true) {
            setFullName(account?.user?.fullName);
            setAddress(account?.user?.address);
            setEmail(account?.user?.email);
            setGender(account?.user?.gender);
            setPhone(account?.user?.phone);
            setDateOfBirth(account?.user?.dateOfBirth);
        } else {
            if (relativeList.length === 0) {
                setFullName("");
                setEmail("");
                setAddress("");
                setGender("Nữ");
                setPhone("");
                setDateOfBirth("");
                setRelativeId("");
            } else {
                setFullName(relativeList[0]?.fullName || "");
                setEmail(relativeList[0]?.email || "");
                setAddress(relativeList[0]?.address || "");
                setGender(relativeList[0]?.gender || "Nữ");
                setPhone(relativeList[0]?.phone || "");
                setDateOfBirth(relativeList[0]?.dateOfBirth || "");
                setRelativeId(relativeList[0]?.id);
            }
        }
        setReason("");
        setMedicalHistory("");
        setSpecialtyId(specialties?.[0]?.id);
    }, [status, relativeList]);

    const getData = async () => {
        let res = await getAllRelative(account?.user?.id);
        if (res && res.EC === 0) {
            setRelativeList(res.DT);
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    const handleChange = (event) => {
        const value = event.target.value === "true";
        setStatus(value);
    };
    const handleRelativeInfo = (event) => {
        let relative;
        try {
            relative = JSON.parse(event.target.value);
        } catch (e) {
            console.error("Error parsing JSON", e);
            return;
        }
        setRelativeId(relative?.id);
        setFullName(relative?.fullName);
        setEmail(relative?.email);
        setAddress(relative?.address);
        setGender(relative?.gender);
        setPhone(relative?.phone);
        setDateOfBirth(relative?.dateOfBirth);
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
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
    // Function to validate the formatted date
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
    const handleChangePhone = (phone) => {
        // Xóa tất cả các ký tự không phải là số
        const cleanedValue = phone.replace(/[^0-9]/g, "");

        // Giới hạn số ký tự nhập vào là 10
        if (cleanedValue.length <= 10) {
            setPhone(cleanedValue);
        }
    };
    const refreshData = async () => {
        let res = await getPatientInfo(account?.user?.id);
        if (res && res.EC === 0) {
            dispatch(doLogin(res));
        }
    };
    const handleSubmitCreactUser = async () => {
        if (!fullName) {
            toast.error("Vui lòng tên bệnh nhân!");
            return;
        }
        if (!phone) {
            toast.error("Vui lòng số điện thoại bệnh nhân!");
            return;
        }
        if (!status) {
            const inValidEmail = validateEmail(email);
            if (!inValidEmail) {
                toast.error("Vui lòng nhập email hợp lệ!");
                return;
            }
        }
        if (!gender) {
            toast.error("Vui lòng chọn giới tính bệnh nhân!");
            return;
        }
        if (!dateOfBirth) {
            toast.error("Vui lòng nhập ngày sinh!");
            return;
        }
        // Set the date of birth if it's a valid date
        if (!isValidDate(dateOfBirth)) {
            toast.error("Ngày sinh không hợp lệ!");
            return;
        }
        if (!address) {
            toast.error("Vui lòng nhập địa chỉ bệnh nhân!");
            return;
        }
        if (!reason) {
            toast.error("Vui lòng nhập lý do khám bệnh!");
            return;
        }

        let format = moment(dateOfBirth, "YYYY-MM-DD", true).isValid();
        if (!format) {
            toast.error("Vui lòng điền ngày sinh hợp lệ!");
            return;
        }
        let data = {
            appointment: {
                statusId: 1,
                scheduleId: scheduleId,
                patientId: account?.user?.id,
            },
            medicalRecord: {
                medicalHistory: medicalHistory,
                reason: reason,
                patientId: account?.user?.id,
                doctorId: doctorId,
                specialtyId: specialtyId,
            },
        };
        if (status) {
            await putUpdatePatient({ id: account?.user?.id, fullName, gender, phone, dateOfBirth, address });
            refreshData();
        } else {
            data.relative = {
                id: relativeId,
                fullName: fullName,
                dateOfBirth: dateOfBirth,
                gender: gender,
                phone: phone,
                email: email,
                address: address,
                patientId: account?.user?.id,
            };
        }

        let res = await postCreateAppointment(data);
        if (res && res.EC === 0) {
            toast.success("Đặt lịch khám bệnh thành công.");
            handleClose();
            getData();
            props.getData();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    return (
        <>
            <Modal
                show={showAppointment}
                onHide={handleClose}
                animation={false}
                size="xl"
                backdrop="static"
                className="modal-add-appointment"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đặt lịch khám</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="custom-img-modal-appointment">
                            <img src={`data:image/jpeg;base64,${doctorInfor?.image}`} className="img-top" alt="..." />

                            <div className="body-content-doctor">
                                <span className="name-text">
                                    {doctorInfor?.Position?.positionName}, Bác sĩ {doctorInfor?.fullName}
                                </span>
                                <span className="time-text fw-semibold">
                                    {time}, {dateList?.[index]}
                                </span>
                                <span className="fw-semibold">Giá khám: {doctorInfor?.price} đ</span>
                            </div>
                        </div>
                        <div className="col-md-12 div-appointment-booking-custom">
                            <select
                                className="form-select"
                                onChange={(event) => setSpecialtyId(event.target.value)}
                                value={specialtyId}
                            >
                                {specialties &&
                                    specialties.length > 0 &&
                                    specialties.map((item, index) => (
                                        <option key={`${index}-m`} value={item?.id}>
                                            {item?.specialtyName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-md-12 div-appointment-booking-custom">
                            <select className="form-select" onChange={handleChange}>
                                <option value={true}>Đặt cho mình</option>
                                <option value={false}>Đặt cho người thân</option>
                            </select>
                        </div>
                        {status === true ? (
                            <></>
                        ) : (
                            <div className="col-md-6 div-appointment-booking-custom">
                                <select
                                    className="form-select pick-date-medical-appointment-custom"
                                    onChange={handleRelativeInfo}
                                >
                                    {relativeList &&
                                        relativeList.length > 0 &&
                                        relativeList.map((item, index) => (
                                            <option key={`${index}-ma`} value={JSON.stringify(item)}>
                                                {item?.fullName}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <div className="col-md-6">
                            <label className="form-label">Họ tên bệnh nhân (bắt buộc)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại (bắt buộc)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(event) => handleChangePhone(event.target.value)}
                            />
                        </div>
                        {status === false ? (
                            <div className="col-md-6">
                                <label className="form-label">Email (bắt buộc)</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="Ví dụ: mail@gmail.com"
                                />
                            </div>
                        ) : (
                            <div className="col-md-6">
                                <label className="form-label">Email (bắt buộc)</label>
                                <input type="email" className="form-control" value={account?.email} disabled />
                            </div>
                        )}

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
                            <label className="form-label">Địa chỉ (bắt buộc)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Lí do khám (bắt buộc)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Lịch sử bệnh án</label>
                            <input
                                type="text"
                                className="form-control"
                                value={medicalHistory}
                                onChange={(event) => setMedicalHistory(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="btn btn-light" onClick={() => handleRefresh()}>
                        Làm mới thông tin
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreactUser()}>
                        Hoàn thành
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateAppointment;
