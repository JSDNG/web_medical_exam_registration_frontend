import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./ModalCreateSchedule.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { getAllTime, postCreateSchedule } from "../../../../services/apiService";
import _ from "lodash";
const ModalCreateSchedule = (props) => {
    const { show, setShow, doctorId } = props;
    const [arrTime, setArrTime] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [dataCreate, setDataCreate] = useState([]);
    const [dataDelete, setDataDelete] = useState([]);

    const handleClose = () => {
        setShow(false);
    };
    useEffect(() => {
        getData();
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
    const handleSubmitCreactSchedule = async () => {
        let date = new Date(moment(startDate).format().split("T")[0]).getTime();

        let newTimes = arrTime
            .filter((item) => item.isSelected)
            .map((item) => ({
                price: "400000",
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
            toast.success(res.EM);
            props.getData();
            getData();
            setArrTime([]);
            setShow(false);
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    const handleOnClickTime = async (timeId) => {
        if (arrTime && arrTime.length > 0) {
            let arrTimeClone = [...arrTime];
            arrTimeClone = arrTimeClone.map((item) => {
                if (item.id === timeId) item.isSelected = !item.isSelected;
                return item;
            });
            setArrTime(arrTimeClone);
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
                            {/* <input
                                //type="email"
                                className="form-control"
                                //value={email}
                                //onChange={(event) => setEmail(event.target.value)}
                            /> */}
                            <DatePicker
                                className="form-control"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                minDate={new Date()}
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
                                            onClick={() => handleOnClickTime(item.id)}
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
