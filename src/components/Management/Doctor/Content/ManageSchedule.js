import "./ManageSchedule.scss";
import { useState, useEffect } from "react";
import { getAllSchedule, getAllTime, postCreateSchedule } from "../../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";
import "./ModalCreateSchedule.scss";
import _ from "lodash";
const ManageSchedule = (props) => {
    const [scheduleList, setSchedulelList] = useState([]);
    const [arrTime, setArrTime] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [dataCreate, setDataCreate] = useState([]);
    const [dataDelete, setDataDelete] = useState([]);
    const account = useSelector((state) => state?.user?.account);

    useEffect(() => {
        getScheduleData();
        getTimeData();
    }, []);
    const getScheduleData = async () => {
        let res = await getAllSchedule(account?.user?.id);
        if (res && res.EC === 0) {
            setSchedulelList(res.DT);
        }
    };
    const getTimeData = async () => {
        let res = await getAllTime();
        if (res && res.EC === 0) {
            const data = res.DT.map((item) => ({
                ...item,
                isSelected: false,
            }));
            setArrTime(data);
        }
    };
    const handleClose = () => {
        setDataCreate([]);
        setDataDelete([]);
    };

    const handleOnClickDate = (date) => {
        console.log(date);
        console.log(scheduleList);
        console.log(arrTime);
        let arrTimeClone = arrTime.map((item) => ({
            ...item,
            isSelected: false,
        }));
        const dateString = moment(date).format("YYYY-MM-DD");
        // Tìm kiếm ngày trong mảng dataSchedule
        let temp = scheduleList.find((item) => item.date === dateString);
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
                const scheduleForDate = scheduleList.find((item) => item.date === dateString);
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

    //console.log(dataDelete);
    const handleSubmitCreactSchedule = async () => {
        if (!startDate) {
            toast.error("Vui lòng chọn thời gian!");
        }
        let date = new Date(moment(startDate).format().split("T")[0]).getTime();
        let newTimes = arrTime
            .filter((item) => item.isSelected)
            .map((item) => ({
                date: date,
                doctorId: account?.user?.id,
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
            getScheduleData();
            handleClose();
        }
        if (res && +res.EC !== 0) {
            toast.error("Tạo lịch làm việc thất bại!");
        }
    };
    console.log(scheduleList);
    return (
        <div className="schedule-container-manage-custom">
            <div className="schedule-header-manage-custom">
                <span className="title-custom">LỊCH TRÌNH LÀM VIỆC CỦA BÁC SĨ</span>
            </div>
            <div className="schedule-body-manage-custom">
                <div className="schedule-content-manage">
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
                                    <button
                                        key={index}
                                        className={
                                            item.isSelected === true
                                                ? "btn btn-schedule-custom active"
                                                : "btn btn-schedule-custom"
                                        }
                                        onClick={() => handleOnClickTime(item.isSelected, item.time, item.id)}
                                    >
                                        {item.time}
                                    </button>
                                );
                            })}
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={() => handleSubmitCreactSchedule()}>
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageSchedule;
