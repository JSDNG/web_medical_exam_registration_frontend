import { useState, useEffect } from "react";
import "./ModalQuickCheckUp.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllSpecialty,
    getAllRelative,
    putUpdatePatient,
    createQuickCheckUp,
    getScheduleForPatient,
} from "../../services/apiService";
import { CgCalendarDates } from "react-icons/cg";
import { BiHourglass } from "react-icons/bi";
import { FaTransgender } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { FaStethoscope } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { MdAddLocationAlt } from "react-icons/md";
import { CgTime } from "react-icons/cg";
const ModalQuickCheckUp = (props) => {
    const { showQuickCheckUp, setShowQuickCheckUp } = props;
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    const [relativeList, setRelativeList] = useState([]);
    const [relativeId, setRelativeId] = useState("");
    const [result, setResult] = useState({});
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [schedule, setSchedule] = useState({});
    const [timeDelay, setTimeDelay] = useState("");
    const [status, setStatus] = useState(true);
    const [specialtyList, setSpecialtyList] = useState([]);
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
        setReason("");
        setMedicalHistory("");
    };

    const handleClose = () => {
        setShowQuickCheckUp(false);
        setStatus(true);
        setReason("");
        setShowConfirm(false);
        setMedicalHistory("");
        setGender("Nữ");
        setSpecialtyId(specialtyList?.[0]?.id);
    };

    useEffect(() => {
        if (status) {
            setFullName(account?.user?.fullName || "");
            setEmail(account?.user?.email || "");
            setAddress(account?.user?.address || "");
            setGender(account?.user?.gender || "Nữ");
            setPhone(account?.user?.phone || "");
            setDateOfBirth(account?.user?.dateOfBirth || "");
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
        setMedicalHistory("");
        setReason("");
    }, [status, account, relativeList, specialtyList]);
    useEffect(() => {
        setSpecialtyId(specialtyList?.[0]?.id);
    }, []);
    useEffect(() => {
        getData();
    }, [account]);

    const getData = async () => {
        let res1 = await getAllSpecialty();
        if (res1 && res1.EC === 0) {
            setSpecialtyList(res1.DT);
        }
        let res = await getAllRelative(account?.user?.id);
        if (res && res.EC === 0) {
            setRelativeList(res.DT);
        }

        if ((res && res.EC !== 0) || res1.EC !== 0) {
            toast.error(res.EM);
        }
    };
    const handleChange = (event) => {
        const value = event.target.value === "true";
        setStatus(value);
    };
    const handleChangePhone = (phone) => {
        // Xóa tất cả các ký tự không phải là số
        const cleanedValue = phone.replace(/[^0-9]/g, "");

        // Giới hạn số ký tự nhập vào là 10
        if (cleanedValue.length <= 10) {
            setPhone(cleanedValue);
        }
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

    const convertMinutesToHours = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} giờ ${remainingMinutes} phút`;
    };

    const handleSubmitFindSchedule = async () => {
        if (!specialtyId) {
            toast.error("Vui lòng chọn chuyên khoa!");
            return;
        }
        if (!fullName) {
            toast.error("Vui lòng nhập tên bệnh nhân!");
            return;
        }
        if (!phone) {
            toast.error("Vui lòng nhập số điện thoại bệnh nhân!");
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

        const date = moment(new Date(Date.now())).format("YYYY-MM-DD HH:mm:ss");
        let res = await getScheduleForPatient(date, specialtyList[specialtyId - 1].specialtyName);
        if (res && res.EC === 0 && res.DT.length === 0) {
            toast.warning("Không tìm thấy lịch khám phù hợp nào !");
            return;
        }
        if (res && res.EC === 0 && res.DT) {
            setSchedule(res.DT);
            setShowQuickCheckUp(false);
            setShowConfirm(true);

            const [startTimeString] = res.DT?.timeId?.time.split(" - ");
            const [startHours, startMinutes] = startTimeString.split(":").map(Number);

            // Convert "08:00" to minutes
            const startTimeInMinutes = startHours * 60 + startMinutes;

            // Get current time in minutes
            const currentTimeInMinutes = new Date().getHours() * 60 + new Date().getMinutes();
            setTimeDelay(convertMinutesToHours(startTimeInMinutes - currentTimeInMinutes));
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    const handleSubmitCreactUser = async () => {
        if (!fullName || !phone || !gender || !address || !reason || !dateOfBirth) {
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
            schedule: schedule,
            medicalRecord: {
                medicalHistory: medicalHistory,
                reason: reason,
                patientId: account?.user?.id,
                specialtyId: specialtyId,
            },
        };
        if (status) {
            await putUpdatePatient({ id: account?.user?.id, fullName, gender, phone, dateOfBirth, address });
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
        let res = await createQuickCheckUp(data);
        if (res && res.EC === 0 && res.DT) {
            toast.success(res.EM);
            getData();
            handleClose();
            setResult(res.DT);
            setShow(true);
            setShowConfirm(false);
        }
        if ((res && res.EC !== 0) || res.DT.length === 0) {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <Modal
                show={showQuickCheckUp}
                onHide={handleClose}
                animation={false}
                size="xl"
                backdrop="static"
                className="modal-quick-check-up"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đăng ký khám nhanh trong ngày</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
                        <div
                            className="col-md-6 div-quick-check-up-custom"
                            style={{ maxHeight: "300px", overflowY: "auto" }}
                        >
                            <select
                                className="form-select"
                                onChange={(event) => setSpecialtyId(event.target.value)}
                                value={specialtyId}
                            >
                                {specialtyList &&
                                    specialtyList.length > 0 &&
                                    specialtyList.map((item, index) => (
                                        <option key={`${index}-m`} value={item?.id}>
                                            {item?.specialtyName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-md-6 div-quick-check-up-custom">
                            <select className="form-select" onChange={handleChange}>
                                <option value={true}>Đặt cho mình</option>
                                <option value={false}>Đặt cho người thân</option>
                            </select>
                        </div>
                        {status === true ? (
                            <></>
                        ) : (
                            <div
                                className="col-md-6 div-quick-check-up-custom"
                                style={{ maxHeight: "300px", overflowY: "auto" }}
                            >
                                <select className="form-select " onChange={handleRelativeInfo}>
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
                    <Button variant="primary" onClick={() => handleSubmitFindSchedule()}>
                        Tiếp tục
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showConfirm}
                animation={false}
                //onHide={() => setShow(false)}
                size="md"
                backdrop="static"
                className="modal-time"
                centered
            >
                <Modal.Header>
                    <Modal.Title style={{ paddingLeft: "145px" }}>Lịch khám bệnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="row">
                            <div className="col-md-12 mt-2">
                                <span
                                    className="form-label"
                                    style={{ fontSize: "20px", fontWeight: "500", paddingLeft: "70px" }}
                                >
                                    Giờ khám: {schedule?.timeId?.time} hôm nay.
                                </span>
                            </div>
                            <div className="col-md-12 mt-2">
                                <span
                                    className="form-label"
                                    style={{ fontSize: "20px", fontWeight: "500", paddingLeft: "60px" }}
                                >
                                    Thời gian chờ dự kiến: {timeDelay}.
                                </span>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="btn btn-light" onClick={() => handleClose()}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitCreactUser()}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={show}
                animation={false}
                onHide={() => setShow(false)}
                size="lg"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin liên quan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="row">
                            <label
                                className="offset-md-3"
                                style={{ fontSize: "20px", fontWeight: "500", paddingLeft: "70px" }}
                            >
                                Thông tin lịch khám bệnh
                            </label>
                            <div className="col-md-12 mb-2" style={{ fontSize: "17px" }}>
                                <span className="form-label">Số thứ tự khám: </span>
                                <span className="form-label fw-semibold">
                                    {result?.appointmentInfo?.appointmentNumber}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2 ">
                                <span className="form-label fw-semibold d-flex align-items-center gap-1">
                                    {" "}
                                    <CgCalendarDates style={{ fontSize: "22px" }} /> {result?.schedule?.date}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2">
                                <span className="form-label fw-semibold d-flex align-items-center gap-1">
                                    <CgTime style={{ fontSize: "22px" }} /> {result?.schedule?.timeId?.time}
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <label
                                className="offset-md-3"
                                style={{ fontSize: "20px", fontWeight: "500", paddingLeft: "80px" }}
                            >
                                Thông tin bệnh nhân
                            </label>
                            <div className="col-md-12 mb-2">
                                <span className="form-label fw-semibold d-flex align-items-center gap-1">
                                    {" "}
                                    <FaStethoscope style={{ fontSize: "22px" }} />{" "}
                                    {result?.specialtyInfo?.specialtyName}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2">
                                <span className="form-label fw-semibold d-flex align-items-center gap-1">
                                    {" "}
                                    <IoPersonSharp style={{ fontSize: "22px" }} /> {result?.patientInfo?.fullName}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2">
                                <span className="form-label fw-semibold d-flex align-items-center gap-1">
                                    <MdLocalPhone style={{ fontSize: "22px" }} /> {result?.patientInfo?.phone}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2">
                                <span className="form-label fw-semibold ">
                                    <MdOutlineMarkEmailRead style={{ fontSize: "22px" }} /> {result?.patientInfo?.email}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2">
                                <span className="form-label fw-semibold d-flex align-items-center gap-1">
                                    <FaTransgender style={{ fontSize: "22px" }} /> {result?.patientInfo?.gender}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2">
                                <span className="form-label fw-semibold d-flex align-items-center gap-1">
                                    <CgCalendarDates style={{ fontSize: "22px" }} />
                                    {result?.patientInfo?.dateOfBirth}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2">
                                <span className="form-label fw-semibold d-flex align-items-center gap-1">
                                    <FaHome style={{ fontSize: "22px" }} /> {result?.patientInfo?.address}{" "}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2 " style={{ fontSize: "17px" }}>
                                <span className="form-label">Lí do khám: </span>
                                <span className="form-label fw-semibold">{result?.medicalRecordInfo?.reason} </span>
                            </div>
                            <div className="col-md-6 mb-2" style={{ fontSize: "17px" }}>
                                <span className="form-label">Lịch sử bệnh án: </span>
                                <span className="form-label fw-semibold">
                                    {result?.medicalRecordInfo?.medicalHistory}
                                </span>
                            </div>
                        </div>
                        <div className="row fw-semibold">
                            <label
                                className="offset-md-3"
                                style={{ fontSize: "20px", fontWeight: "500", paddingLeft: "100px" }}
                            >
                                Thông tin bác sĩ
                            </label>
                            <div className="col-md-6 mb-2 ">
                                <span className="form-label d-flex align-items-center gap-1">
                                    <IoPersonSharp style={{ fontSize: "22px" }} /> {result?.doctorInfo?.fullName}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2">
                                <span className="form-label d-flex align-items-center gap-1">
                                    <MdLocalPhone style={{ fontSize: "22px" }} /> {result?.doctorInfo?.phone}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2">
                                <span className="form-label d-flex align-items-center gap-1">
                                    <FaTransgender style={{ fontSize: "22px" }} /> {result?.doctorInfo?.gender}
                                </span>
                            </div>
                            <div className="col-md-6 mb-2">
                                <span className="form-label d-flex align-items-center gap-1">
                                    <IoIosPricetags style={{ fontSize: "22px" }} /> {result?.doctorInfo?.price} đ
                                </span>
                            </div>
                            <div className="col-md-12 mb-2">
                                <span className="form-label d-flex align-items-center gap-1">
                                    <MdAddLocationAlt style={{ fontSize: "22px" }} /> 97 Man Thiện, phường Hiệp Phú, TP
                                    Thủ Đức
                                </span>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalQuickCheckUp;
