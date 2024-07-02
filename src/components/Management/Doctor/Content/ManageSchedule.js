import "./ManageSchedule.scss";
import { useNavigate } from "react-router-dom";
import ModalCreactSchedule from "./ModalCreateSchedule";
import { useState, useEffect } from "react";
import { getAllChedule } from "../../../../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
const ManageSchedule = (props) => {
    const [show, setShow] = useState(false);
    const [listSchedule, setListSchedule] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllChedule(account?.user?.id);
        if (res && res.EC === 0) {
            setListSchedule(res.DT);
        }
    };
    return (
        <div className="schedule-container-manage-custom">
            <div className="schedule-header-manage-custom">
                <span className="title-custom">LỊCH TRÌNH LÀM VIỆC CỦA BÁC SĨ</span>
            </div>
            <div className="btn-add-schedule-manage-custom">
                <button className="btn btn-primary" onClick={() => setShow(true)}>
                    Thêm mới
                </button>
                <ModalCreactSchedule
                    show={show}
                    setShow={setShow}
                    getData={getData}
                    doctorId={account?.user?.id}
                    listSchedule={listSchedule}
                />
            </div>

            <div className="schedule-body-manage-custom">
                <div className="schedule-content-manage">
                    <div className="col-md-6">
                        <label className="form-label">Chọn ngày</label>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Thời gian</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {data &&
                                data.length > 0 &&
                                data.schedules.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.timeId.time}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    );
                                })} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageSchedule;
