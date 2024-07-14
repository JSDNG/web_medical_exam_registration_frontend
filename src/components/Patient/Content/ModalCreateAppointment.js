import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { postCreateAppointment, putUpdatePatient, getAllRelative } from "../../../services/apiService";
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
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    const [relativeList, setRelativeList] = useState([]);

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
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (status === true) {
            setFullName(account?.user?.fullName);
            setAddress(account?.user?.address);
            setGender(account?.user?.gender);
            setPhone(account?.user?.phone);
            setDateOfBirth(account?.user?.dateOfBirth);
            setSpecialtyId(specialties?.[0]?.id);
            setReason("");
            setMedicalHistory("");
        } else {
            setFullName(relativeList?.[0]?.fullName);
            setEmail(relativeList?.[0]?.email);
            setAddress(relativeList?.[0]?.address);
            setGender(relativeList?.[0]?.gender);
            setPhone(relativeList?.[0]?.phone);
            setDateOfBirth(relativeList?.[0]?.dateOfBirth);
            //setSpecialtyId(specialties?.[0]?.id);
            setMedicalHistory("");
            setReason("");
        }
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
    const handleSubmitCreactUser = async () => {
        if (!fullName || !phone || !gender || !address || !reason) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }
        let format = moment(dateOfBirth, "YYYY-MM-DD", true).isValid();
        if (!format) {
            toast.error("Vui lòng điền ngày sinh hợp lệ!");
            return;
        }
        if (!status) {
            const inValidEmail = validateEmail(email);
            if (!inValidEmail) {
                toast.error("Vui lòng nhập email!");
                return;
            }
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
        } else {
            data.relative = {
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
            toast.success(res.EM);
            handleClose();
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
                    <form className="row g-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <div className="custom-img-modal-appointment">
                            <img src={`data:image/jpeg;base64,${doctorInfor?.image}`} className="img-top" alt="..." />

                            <div className="body-content-doctor">
                                <span className="name-text">
                                    {doctorInfor?.Position?.positionName}, Bác sĩ {doctorInfor?.fullName}
                                </span>
                                <span className="time-text">
                                    {time} {dateList?.[index]}
                                </span>
                                <span>Giá khám: {doctorInfor?.price} đ</span>
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
                                onChange={(event) => setPhone(event.target.value)}
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
