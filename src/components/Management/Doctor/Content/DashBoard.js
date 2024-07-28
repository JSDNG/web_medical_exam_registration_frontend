import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAppointmentFromDoctor, getAllSchedule } from "../../../../services/apiService";
import { useSelector } from "react-redux";
import icon_medical_record from "../../../../assets/image/icon_medical_record.jpg";
import icon_medical from "../../../../assets/image/images.png";
import img_work_doctor from "../../../../assets/image/img-work-doctor.jpg";
import moment from "moment";
const DashBoard = (props) => {
    const [medicalRecordNumber, setMedicalRecordNumber] = useState("");
    const [medicalRecordNumber1, setMedicalRecordNumber1] = useState("");
    const [dateList, setDateList] = useState([]);
    const navigate = useNavigate();
    const account = useSelector((state) => state?.user?.account);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllAppointmentFromDoctor(account?.user?.id, 3);
        if (res && res.EC === 0) {
            setMedicalRecordNumber1(res.DT.length);
        }
        let res1 = await getAllAppointmentFromDoctor(account?.user?.id, 2);
        if (res1 && res1.EC === 0) {
            let count = 0;
            res1.DT.forEach((item) => {
                if (Array.isArray(item.data)) {
                    count += item.data.length;
                }
            });
            setMedicalRecordNumber(count);
        }
        let res3 = await getAllSchedule(account?.user?.id);
        if (res3 && res3.EC === 0) {
            // Lọc các lịch trình theo điều kiện Appointment
            let date = moment(new Date(Date.now())).format("YYYY-MM-DD");
            const result = res3.DT.filter((item) => item.schedules.length > 0 && item.date >= date);
            setDateList(result.map((item) => item.date));
        }
    };
    return (
        <div className="container-dash-board-doctor">
            <div className="dash-board-doctor-custom">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body d-flex gap-4">
                            <img src={icon_medical} style={{ width: "195px" }} />
                            <div className="mt-4">
                                <div className="mt-2">
                                    <span className="card-title ">Có </span>
                                    <span className="card-title fw-semibold">{medicalRecordNumber1} </span>
                                    <span className="card-title"> bệnh án đã khám</span>
                                </div>
                                <button
                                    className="btn btn-primary mt-3"
                                    onClick={() => navigate("/quan-ly/bac-si/danh-sach-benh-an-da-kham")}
                                >
                                    Xem chi tết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body d-flex">
                            <img src={icon_medical_record} style={{ width: "205px" }} />
                            <div className="mt-4">
                                <div className="mt-">
                                    <span className="card-title ">Có </span>
                                    <span className="card-title fw-semibold">{medicalRecordNumber} </span>
                                    <span className="card-title "> bệnh án chưa khám</span>
                                </div>
                                <button
                                    className="btn btn-primary mt-3 mb-2"
                                    onClick={() => navigate("/quan-ly/bac-si/quan-ly-kham-benh")}
                                >
                                    Xem chi tết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dash-board-doctor-custom">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body d-flex">
                            <img src={img_work_doctor} style={{ width: "190px" }} />
                            <div className="mt-4">
                                <div className="mt-2">
                                    <span className="card-title ">Có </span>
                                    <span className="card-title fw-semibold">{dateList.length} </span>
                                    <span className="card-title "> ngày làm việc sắp tới</span>
                                </div>
                                <button
                                    className="btn btn-primary mt-4 mb-2"
                                    onClick={() => navigate("/quan-ly/bac-si/quan-ly-lich-lam-viec")}
                                >
                                    Xem chi tết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
