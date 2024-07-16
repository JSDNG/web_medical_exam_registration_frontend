import "./AllDoctorfromOneSpecialty.scss";
import { IoHome } from "react-icons/io5";
import { getAllDoctorfromSpecialtyById } from "../../../services/apiService";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";
const AllDoctorfromOneSpecialty = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [doctorList, setDoctorList] = useState([]);
    const [specialtyDetail, setSpecialtyDetail] = useState({});
    useEffect(() => {
        getData();
    }, [id]);
    const getData = async () => {
        let res = await getAllDoctorfromSpecialtyById(id);
        if (res && res.EC === 0) {
            setDoctorList(res.DT.MedicalStaffs);
            setSpecialtyDetail(res.DT);
        }
        if (res && res.EC !== 0) {
            console.log("err");
        }
    };
    return (
        <div className="prominent-doctor-list-container-client-custom">
            <div className="custom-link-header">
                <IoHome onClick={() => navigate("/")} className="custom-link" />
                <span className="custom-link" onClick={() => navigate("/dich-vu-y-te/kham-chuyen-khoa")}>
                    {" "}
                    / Khám chuyên khoa
                </span>
            </div>
            <div className="specialty-info-custom">
                <span className="specialty-name-custom">{specialtyDetail?.specialtyName}</span>
                <span className="doctor-specialty-name-custom">
                    Bác sĩ chuyên khoa {specialtyDetail?.specialtyName}
                </span>
                <span className="span-specialty-custom">
                    Mô tả: {specialtyDetail?.description}
                </span>
            </div>
            <div className="prominent-doctor-list-body-client">
                {doctorList &&
                    doctorList.length > 0 &&
                    doctorList.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="detail-doctor-custom card"
                                onClick={() =>
                                    navigate(`/dich-vu-y-te/kham-chuyen-khoa/bac-si/${item.id}`, {
                                        state: { data: item },
                                    })
                                }
                            >
                                <div className="info-doctor-custom">
                                    <img
                                        className="image-doctor-custom"
                                        src={`data:image/jpeg;base64,${item?.image}`}
                                    />

                                    <div className="doctor-specialty-custom">
                                        <span className="doctor-name-custom">
                                            {item?.Position?.positionName}, {item?.fullName}{" "}
                                        </span>
                                        <span>{item?.description}</span>
                                        <div>
                                            <ImLocation2 />
                                            <span> {item?.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default AllDoctorfromOneSpecialty;
