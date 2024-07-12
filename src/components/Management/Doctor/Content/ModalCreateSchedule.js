import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./ModalCreateSchedule.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { getAllTime, postCreateSchedule, deleteOneSchedule } from "../../../../services/apiService";
import _ from "lodash";
const ModalCreateSchedule = (props) => {
    const { show, setShow, doctorId, listSchedule } = props;
    const [arrTime, setArrTime] = useState([]);
    const [startDate, setStartDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
    const [dataCreate, setDataCreate] = useState([]);
    const [dataDelete, setDataDelete] = useState([]);
    const handleClose = () => {
        setShow(false);
        setDataCreate([]);
        setDataDelete([]);
        setStartDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
        let arrTimeClone = arrTime.map((item) => ({
            ...item,
            isSelected: false,
        }));
        setArrTime(arrTimeClone);
    };
    useEffect(() => {
        getData();
        //handleOnClickDate(startDate);
    }, []);
    const getData = async () => {
        let res = await getAllTime();
        if (res && res.EC === 0) {
            const data = res.DT.map((item) => ({
                ...item,
                isSelected: false,
            }));
            setArrTime(data);
        }
    };
    const handleOnClickDate = (date) => {
        let arrTimeClone = arrTime.map((item) => ({
            ...item,
            isSelected: false,
        }));
        const dateString = moment(date).format("YYYY-MM-DD");
        // Tìm kiếm ngày trong mảng dataSchedule
        let temp = props.listSchedule.find((item) => item.date === dateString);
        if (temp) {
            // Lặp qua các schedule của ngày tìm được
            temp.schedules.forEach((schedule) => {
                // Tìm thời gian trong mảng time và đặt isSelected = true nếu thời gian trùng khớp
                let matchingTime = arrTimeClone.find((t) => t.time === schedule.timeId.time);
                if (matchingTime) {
                    matchingTime.isSelected = true;
                }
            });
        }
        setArrTime(arrTimeClone);
    };
    const handleOnClickTime = async (status, time, timeId) => {
        if (status === true) {
            try {
                const dateString = moment(startDate).format("YYYY-MM-DD");
                let updatedDataDelete = new Set(dataDelete);
                let shouldUpdateArrTime = true;

                // Duyệt qua các lịch trình và cập nhật updatedDataDelete
                const scheduleForDate = listSchedule.find((item) => item.date === dateString);
                if (scheduleForDate) {
                    for (const schedule of scheduleForDate.schedules) {
                        if (schedule.timeId.time === time) {
                            if (schedule.Appointment.id === null) {
                                updatedDataDelete.add(schedule.id);
                            } else {
                                toast.error("Không thể xóa lịch trình vì có một bệnh nhân đã được lên lịch hẹn");
                                shouldUpdateArrTime = false;
                                break;
                            }
                        }
                    }
                }

                if (shouldUpdateArrTime) {
                    const updatedArrTime = arrTime.map((item) => {
                        if (item.id === timeId) {
                            return { ...item, isSelected: !item.isSelected };
                        }
                        return item;
                    });

                    setDataDelete(Array.from(updatedDataDelete));
                    setArrTime(updatedArrTime);
                }
            } catch (error) {
                console.error("Error handling time click:", error);
                toast.error("Lỗi");
            }
        } else {
            const updatedArrTime = arrTime.map((item) => {
                if (item.id === timeId) {
                    return { ...item, isSelected: !item.isSelected };
                }
                return item;
            });

            setArrTime(updatedArrTime);
        }
    };

    console.log(dataDelete);
    const handleSubmitCreactSchedule = async () => {
        let date = new Date(moment(startDate).format().split("T")[0]).getTime();
        let newTimes = arrTime
            .filter((item) => item.isSelected)
            .map((item) => ({
                date: date,
                doctorId: doctorId,
                timeId: item.id,
            }));

        // Cập nhật trạng thái chỉ một lần với tất cả các newTime
        setDataCreate((prevDataCreate) => [...prevDataCreate, ...newTimes]);

        let data = {
            create: [...dataCreate, ...newTimes], // Bao gồm cả trạng thái hiện tại và các thời gian mới
            delete: dataDelete,
        };
        console.log(data);
        let res = await postCreateSchedule(data);
        if (res && res.EC === 0) {
            toast.success("Tạo lịch làm việc thành công!");
            props.getData();
            getData();
            setArrTime([]);
            handleClose();
        }
        if (res && +res.EC !== 0) {
            toast.error("Tạo lịch làm việc thất bại!");
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
                className="modal-add-schedule"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thêm lịch làm việc</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3 form-schedule-custom">
                        <div className="col-md-6">
                            <label className="form-label">Chọn ngày</label>
                            <DatePicker
                                className="form-control"
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date); // Cập nhật ngày mới vào state
                                    handleOnClickDate(date); // Xử lý logic khi ngày thay đổi
                                }}
                                minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)}
                            />
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
                                            onClick={() => handleOnClickTime(item.isSelected, item.time, item.id)}
                                        >
                                            {item.time}
                                        </Button>
                                    );
                                })}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmitCreactSchedule()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateSchedule;
