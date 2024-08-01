import "./SearchPage.scss";
import { IoHome } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";
import { getAllMedicalStaff } from "../../services/apiService";
const SearchPage = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const string = params.id;
    const [doctorList, setDoctorList] = useState([]);
    useEffect(() => {
        getData();
    }, [string]);
    const getData = async () => {
        let res = await getAllMedicalStaff("bac-si", string);
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
                <span> / Kết quả tìm kiếm bác sĩ</span>
            </div>

            <div className="list-doctor-body-client">
                {doctorList && doctorList.length > 0 ? (
                    <>
                        {doctorList &&
                            doctorList.length > 0 &&
                            doctorList.map((item, index) => {
                                return (
                                    <>
                                        <div
                                            key={`${index}-sp`}
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
                    </>
                ) : (
                    <div>
                        {" "}
                        <span style={{ marginLeft: "45%", fontSize: "20px" }}> Không có kết quả phù hợp</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
