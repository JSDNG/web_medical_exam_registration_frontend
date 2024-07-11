import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { postCreateAppointment, putUpdatePatient, getAllRelative } from "../../../services/apiService";
const ModalCreateAppointment = (props) => {
    const { showAppointment, setShowAppointment, specialties, scheduleId, doctorId } = props;
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
            setSpecialtyId(specialties?.[0]?.id);
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

    const handleSubmitCreactUser = async () => {
        if (!fullName || !phone || !gender || !address || !reason) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
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
        console.log(data);
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
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đặt lịch khám</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <div className="col-md-6 offset-md-3">
                            <select className="form-select" onChange={handleChange}>
                                <option value={true}>Đặt cho mình</option>
                                <option value={false}>Đặt cho người thân</option>
                            </select>
                        </div>
                        {status === true ? (
                            <></>
                        ) : (
                            <div className="col-md-6 offset-md-3">
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
                        <div className="col-md-6 offset-md-3">
                            <label className="form-label">Chuyên khoa</label>
                            <Button variant="primary" className="btn btn-light" onClick={() => handleRefresh()}>
                                Làm mới thông tin
                            </Button>
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
                            <label className="form-label">ngày sinh</label>
                            <input
                                type="text"
                                className="form-control"
                                value={dateOfBirth}
                                onChange={(event) => setDateOfBirth(event.target.value)}
                                placeholder="năm-tháng-ngày"
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
                    <Button variant="primary" onClick={() => handleSubmitCreactUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateAppointment;
