import imageHomePage from "../../assets/image/image_home.png";
import { useNavigate } from "react-router-dom";
import { getListOfFamousDoctors, getAllSpecialty, getPatientInfo, logout } from "../../services/apiService";
import "./HomePage.scss";
import { doLogin } from "../../redux/action/userAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const HomePage = () => {
    const [doctorList, setDoctorList] = useState([]);
    const [specialtyList, setSpecialtyList] = useState([]);
    const [currentDoctorPage, setCurrentDoctorPage] = useState(1);
    const [currentSpecialtyPage, setCurrentSpecialtyPage] = useState(1);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    const navigate = useNavigate();
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    };

    useEffect(() => {
        getData(currentSpecialtyPage);
    }, [currentSpecialtyPage]);
    const getData = async (page) => {
        const limit = 3;
        let res = await getAllSpecialty(page, limit);
        if (res && res.EC === 0) {
            setSpecialtyList(res.DT);
        }
        if (isAuthenticated === false && getCookie("id") !== undefined) {
            let res2 = await getPatientInfo(getCookie("id"));
            if (res2 && res2.EC === 0) {
                dispatch(doLogin(res2));
                toast.success("Đăng nhập với google thành công.");
                navigate("/");
            }
        }
    };
    const handleClickArrowSpecialty = (status) => {
        if (status === "decrease") {
            if (currentSpecialtyPage - 1 === 0) return;
            setCurrentSpecialtyPage((prevPage) => prevPage - 1);
        } else if (status === "increase") {
            if (specialtyList.totalPages >= currentSpecialtyPage + 1)
                setCurrentSpecialtyPage((prevPage) => prevPage + 1);
        }
    };
    useEffect(() => {
        getDoctorByPage(currentDoctorPage);
    }, [currentDoctorPage]);

    const getDoctorByPage = async (page) => {
        const limit = 4;
        let res = await getListOfFamousDoctors(page, limit);
        if (res && res.EC === 0) {
            setDoctorList(res.DT);
        }
    };
    useEffect(() => {
        if (account && account.role === "Bệnh nhân") {
            navigate("/");
        } else if (account && account.role === "Nhân viên") {
            navigate("/quan-ly/nhan-vien");
        } else if (account && account.role === "Bác sĩ") {
            navigate("/quan-ly/bac-si");
        } else if (account && account.role === "Quản trị viên") {
            navigate("/quan-ly/quan-tri-vien");
        }
    }, [navigate]);
    const handleClickArrow = (status) => {
        if (status === "decrease") {
            if (currentDoctorPage - 1 === 0) return;
            setCurrentDoctorPage((prevPage) => prevPage - 1);
        } else if (status === "increase") {
            if (doctorList.totalPages >= currentDoctorPage + 1) setCurrentDoctorPage((prevPage) => prevPage + 1);
        }
    };
    return (
        <div className="homepage-container">
            <div className="homepage-content-header">
                <img src={imageHomePage} alt="prop" className="custom-image-home" />
            </div>
            <div className="homepage-content-specialty">
                <div className="header-specialty">
                    <span className="header-div">Chuyên khoa</span>
                    <button
                        className="btn btn-light btn-header-good-doctor-custom"
                        onClick={() => navigate("/dich-vu-y-te/kham-chuyen-khoa")}
                    >
                        Xem thêm
                    </button>
                </div>

                <div className="body-specialty">
                    <div className="body-btn-left-right">
                        <div className="btn-left-right" onClick={() => handleClickArrowSpecialty("decrease")}>
                            <IoIosArrowBack style={{ fontSize: "20px", fontWeight: 500, color: "green" }} />
                        </div>
                    </div>
                    <div className="content-specialty">
                        {specialtyList.data &&
                            specialtyList.data.length > 0 &&
                            specialtyList.data.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="custom-card-home-page"
                                        onClick={() =>
                                            navigate(`/dich-vu-y-te/kham-chuyen-khoa/danh-sach-bac-si/${item.id}`)
                                        }
                                    >
                                        <img src={`data:image/jpeg;base64,${item?.image}`} className="card-img-top" />
                                        <div className="card-body-custom">
                                            <span className="card-text-custom">{item.specialtyName}</span>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <div className="body-btn-left-right">
                        <div className="btn-left-right " onClick={() => handleClickArrowSpecialty("increase")}>
                            <IoIosArrowForward style={{ fontSize: "20px", fontWeight: 500, color: "green" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="homepage-content-good-doctor">
                <div className="header-good-doctor">
                    <span className="header-div">Bác sĩ nổi bật</span>
                    <button
                        className="btn btn-light btn-header-good-doctor-custom"
                        onClick={() => navigate("/danh-sach/bac-si/noi-bat")}
                    >
                        Xem thêm
                    </button>
                </div>
                <div className="body-good-doctor">
                    <div className="btn-left" onClick={() => handleClickArrow("decrease")}>
                        <IoIosArrowBack style={{ fontSize: "20px", fontWeight: 500, color: "green" }} />
                    </div>

                    <div className="content-good-doctor">
                        {doctorList.data &&
                            doctorList.data.length > 0 &&
                            doctorList.data.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="container-custom"
                                        onClick={() =>
                                            navigate(`/dich-vu-y-te/kham-chuyen-khoa/bac-si/${item.id}`, {
                                                state: { data: item },
                                            })
                                        }
                                    >
                                        <img
                                            src={`data:image/jpeg;base64,${item?.image}`}
                                            className="custom-image-home"
                                        />
                                        <span className="name-text">Bác sĩ {item?.fullName}</span>
                                        <div className="div-specilty-list-custom">
                                            {item &&
                                                item.Specialties.length > 0 &&
                                                item.Specialties.map((item, index) => {
                                                    return <span key={index}>{item.specialtyName}, </span>;
                                                })}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="btn-right " onClick={() => handleClickArrow("increase")}>
                        <IoIosArrowForward style={{ fontSize: "20px", fontWeight: 500, color: "green" }} />
                    </div>
                </div>
            </div>
            {/* <div className="homepage-content-service">
                <div className="header-service">
                    <span className="header-div">Dịch vụ toàn diện</span>
                </div>
                <div className="body-service"></div>
                <span className="test">4</span>
            </div> */}
        </div>
    );
};

export default HomePage;
