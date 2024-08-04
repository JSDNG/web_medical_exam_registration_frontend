import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./ModalReExamination.scss";
import moment from "moment";
import { getAllSchedule, postReExamination } from "../../../../services/apiService";
import _ from "lodash";
import { useSelector } from "react-redux";
const ModalReExamination = (props) => {
    const { showReExamination, setShowReExamination, data } = props;
    const [arrTime, setArrTime] = useState([]);
    const [scheduleList, setScheduleList] = useState([]);
    const [dateList, setDateList] = useState([]);
    const [index, setIndex] = useState(0);
    const [scheduleId, setScheduleId] = useState("");
    const account = useSelector((state) => state?.user?.account);
    const handleClose = () => {
        setShowReExamination(false);
    };
    useEffect(() => {
        getScheduleData();
    }, []);
    const getScheduleData = async () => {
        let res = await getAllSchedule(account?.user?.id);

        if (res && res.EC === 0) {
            // Lọc các lịch trình theo điều kiện Appointment
            res.DT.forEach((entry) => {
                entry.schedules = entry.schedules.filter((schedule) => {
                    if (schedule.Appointment && schedule.Appointment.id === null) {
                        delete schedule.Appointment;
                        return true;
                    }
                    return !schedule.Appointment || schedule.Appointment.id === null;
                });
            });
            let date = moment(new Date(Date.now())).format("YYYY-MM-DD");
            const result = res.DT.filter((item) => item.schedules.length > 0 && item.date > date);
            setScheduleList(result);
            setDateList(result.map((item) => item.date));
        }
    };
    useEffect(() => {
        if (scheduleList.length > 0) {
            let arrTimeClone = scheduleList[index].schedules.map((item) => ({
                ...item,
                isSelected: false,
            }));
            setArrTime(arrTimeClone);
        }
    }, [index, scheduleList]);

    const handleOnClickTime = async (status, scheduleId) => {
        console.log(scheduleId);
        setScheduleId(scheduleId);

        const updatedArrTime = arrTime.map((item) => {
            if (item.id === scheduleId) {
                return { ...item, isSelected: status ? !item.isSelected : true };
            }
            return { ...item, isSelected: false };
        });

        setArrTime(updatedArrTime);
    };
    const handleSubmit = async () => {
        let rawData = {
            scheduleId: scheduleId,
            recordId: data.MedicalRecord.id,
            doctorId: account?.user?.id,
            patientId: data.Patient.id,
        };
        let res = await postReExamination(rawData);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            props.getData();
            getScheduleData();
            setArrTime([]);
            handleClose();
        }
        if (res && +res.EC !== 0) {
            toast.error("");
        }
    };
    return (
        <>
            <Modal
                show={showReExamination}
                onHide={handleClose}
                animation={false}
                size="lg"
                backdrop="static"
                className="modal-pick-time"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Chọn thời gian tái khám</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3 form-schedule-custom">
                        <div className="col-md-6">
                            <label className="form-label">Chọn ngày</label>
                            <select
                                className="form-select pick-date-medical-appointment-custom"
                                onChange={(event) => setIndex(event.target.value)}
                            >
                                {dateList &&
                                    dateList.length > 0 &&
                                    dateList.map((item, index) => (
                                        <option key={`${index}-ma`} value={index}>
                                            {item}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="col-12 pick-hour">
                            {arrTime &&
                                arrTime.length > 0 &&
                                arrTime.map((item, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            className={
                                                item.isSelected === true
                                                    ? "btn btn-schedule-custom active"
                                                    : "btn btn-schedule-custom"
                                            }
                                            onClick={() => handleOnClickTime(item.isSelected, item.id)}
                                        >
                                            {item.timeId.time}
                                        </Button>
                                    );
                                })}
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

export default ModalReExamination;
