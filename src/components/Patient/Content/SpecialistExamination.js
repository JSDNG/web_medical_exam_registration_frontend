import "./SpecialistExamination.scss";
import { useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { getAllSpecialty } from "../../../services/apiService";
import { useState, useEffect } from "react";
const SpecialistExamination = (props) => {
    const navigate = useNavigate();
    const [specialtyList, setSpecialtyList] = useState([]);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllSpecialty();
        if (res && res.EC === 0) {
            setSpecialtyList(res.DT);
        }
        if (res && res.EC !== 0) {
            console.log("err");
        }
    };
    return (
        <div className="specialty-list-container-client-custom">
            <div className="custom-link-header">
                <IoHome onClick={() => navigate("/")} className="custom-link" />
                <span> / Khám chuyên khoa</span>
            </div>
            <div className="specialty-list-body-client">
                {specialtyList &&
                    specialtyList.length > 0 &&
                    specialtyList.map((item, index) => {
                        return (
                            <>
                                <div
                                    key={`${index}-1`}
                                    className="detail-specialty-custom"
                                    onClick={() =>
                                        navigate(`/dich-vu-y-te/kham-chuyen-khoa/danh-sach-bac-si/${item.id}`)
                                    }
                                >
                                    <div>
                                        <img
                                            className="image-specialty-custom"
                                            src={`data:image/jpeg;base64,${item?.image}`}
                                        />
                                    </div>
                                    <div className="info-specialty-custom">
                                        <div className="specialty-name-custom">
                                            <span>{item?.specialtyName} </span>
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

export default SpecialistExamination;
