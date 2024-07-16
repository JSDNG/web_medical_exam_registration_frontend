import "./ProminentDoctorList.scss";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { getAllDoctor } from "../../../services/apiService";
import { useState, useEffect } from "react";
const ProminentDoctorList = (props) => {
    const navigate = useNavigate();
    const [doctorList, setDoctorList] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllDoctor("bac-si");
        if (res && res.EC === 0) {
            setDoctorList(res.DT);
        }
        if (res && res.EC !== 0) {
            console.log("err");
        }
    };
    return (
        <div className="list-doctor-container-client-custom">
            <div className="custom-link-header">
                <IoHome onClick={() => navigate("/")} className="custom-link" />
                <span> / Bác sĩ nổi bật</span>
            </div>
            <div className="list-doctor-custom-header">
                <span>Bác sĩ nổi bật</span>
            </div>
            <div className="list-doctor-body-client">
                {doctorList &&
                    doctorList.length > 0 &&
                    doctorList.map((item, index) => {
                        return (
                            <>
                                <div
                                    key={index}
                                    className="detail-good-doctor-custom"
                                    onClick={() =>
                                        navigate(`/dich-vu-y-te/kham-chuyen-khoa/bac-si/${item.id}`, {
                                            state: { data: item },
                                        })
                                    }
                                >
                                    <div>
                                        <img
                                            className="image-good-doctor-custom"
                                            src={`data:image/jpeg;base64,${item?.image}`}
                                        />
                                    </div>
                                    <div className="info-good-doctor-custom">
                                        <div className="position-fullname-good-doctor-custom">
                                            <span>{item?.Position?.positionName}, </span>
                                            <span className="name-text">Bác sĩ {item.fullName}</span>
                                        </div>
                                        <div className="specicalties-good-doctor-custom">
                                            {item.Specialties &&
                                                item.Specialties.length > 0 &&
                                                item.Specialties.map((item, index) => {
                                                    return <span key={index}>{item.specialtyName}, </span>;
                                                })}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </>
                        );
                    })}
            </div>
        </div>
    );
};

export default ProminentDoctorList;
