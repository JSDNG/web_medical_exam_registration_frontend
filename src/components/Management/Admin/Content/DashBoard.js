import { useNavigate } from "react-router-dom";
import { getAllMedicalStaff, getAllMedication, getAllSpecialty } from "../../../../services/apiService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import icon_doctor from "../../../../assets/image/icon-doctor.jpeg";
import icon_staff from "../../../../assets/image/icon-staff.png";
import icon_medication from "../../../../assets/image/icon-medication.jpg";
import icon_specialty from "../../../../assets/image/icon-specialty.png";
const DashBoard = (props) => {
    const [doctorNumber, setDoctorNumber] = useState("");
    const [staffNumber, setStaffNumber] = useState("");
    const [medicationNumber, setMedicationNumber] = useState("");
    const [specialtyNumber, setSpecialtyNumber] = useState("");
    const navigate = useNavigate();
    const account = useSelector((state) => state?.user?.account);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllMedicalStaff("bac-si");
        if (res && res.EC === 0) {
            setDoctorNumber(res.DT.length);
        }
        let res1 = await getAllMedicalStaff("nhan-vien");
        if (res1 && res1.EC === 0) {
            setStaffNumber(res1.DT.length);
        }
        let res2 = await getAllMedication();
        if (res2 && res2.EC === 0) {
            setMedicationNumber(res2.DT.length);
        }
        let res3 = await getAllSpecialty();
        if (res3 && res3.EC === 0) {
            setSpecialtyNumber(res3.DT.length);
        }
    };
    return (
        <div className="container-dash-board-admin">
            <div className="dash-board-admin-custom">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body d-flex gap-2 mb-2">
                            <img src={icon_doctor} style={{ width: "200px" }} className="mt-2 mb-1" />
                            <div className="mt-4">
                                <div className="mt-2">
                                    <span className="card-title ">Phòng khám có </span>
                                    <span className="card-title fw-semibold">{doctorNumber} </span>
                                    <span className="card-title mr-4"> bác sĩ</span>
                                </div>
                                <button
                                    className="btn btn-primary mt-4 ml-2"
                                    onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-bac-si")}
                                >
                                    Xem chi tết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body d-flex gap-2 mt-1">
                            <img src={icon_staff} style={{ width: "220px" }} className="mt-2 mb-4" />
                            <div className="mt-4">
                                <div className="mt-2">
                                    <span className="card-title ">Có </span>
                                    <span className="card-title fw-semibold">{staffNumber} </span>
                                    <span className="card-title mr-4"> nhân viên chăm sóc khách hàng</span>
                                </div>
                                <button
                                    className="btn btn-primary mt-4 mb-4"
                                    onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-nhan-vien")}
                                >
                                    Xem chi tết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dash-board-admin-custom">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body d-flex gap-4">
                            <img src={icon_medication} style={{ width: "180px" }} className="mt-2" />
                            <div className="mt-4" style={{ width: "180px" }}>
                                <div className="mt-2">
                                    <span className="card-title ">Có </span>
                                    <span className="card-title fw-semibold">{medicationNumber} </span>
                                    <span className="card-title mr-4"> thuốc</span>
                                </div>
                                <button
                                    className="btn btn-primary mt-4 mb-4"
                                    onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-thuoc")}
                                >
                                    Xem chi tết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body d-flex gap-4">
                            <img
                                src={icon_specialty}
                                style={{ width: "200px", paddingLeft: "20px" }}
                                className="mt-2"
                            />
                            <div className="mt-4" style={{ width: "180px" }}>
                                <div className="mt-2">
                                    <span className="card-title ">Có </span>
                                    <span className="card-title fw-semibold">{specialtyNumber} </span>
                                    <span className="card-title mr-4"> chuyên khoa</span>
                                </div>
                                <button
                                    className="btn btn-primary mt-4 mb-2"
                                    onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-chuyen-khoa")}
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
