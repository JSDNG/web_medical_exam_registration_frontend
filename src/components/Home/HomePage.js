import imageHomePage from "../../assets/image/image_home.png";
import imageHomePagedoctor from "../../assets/image/image_doctor.jpg";
import imageHomePageSpecialty from "../../assets/image/image_specialty.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllDoctor, getAllSpecialty } from "../../services/apiService";
import "./HomePage.scss";
import { useEffect, useState } from "react";
const HomePage = () => {
    const [doctorList, setDoctorList] = useState([]);
    const [specialtyList, setSpecialtyList] = useState([]);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);

    const navigate = useNavigate();
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        let res = await getAllDoctor("bac-si");
        if (res && res.EC === 0) {
            setDoctorList(res.DT.slice(0, 4));
        }
        let res1 = await getAllSpecialty();
        if (res1 && res1.EC === 0) {
            setSpecialtyList(res1.DT.slice(0, 3));
        }
    };
    console.log(doctorList);
    return (
        <div className="homepage-container">
            <div className="homepage-content-header">
                <img src={imageHomePage} alt="prop" className="custom-image-home" />
            </div>
            <div className="homepage-content-for-you">
                <div className="header-for-you">
                    <span className="header-div">Dành cho bạn</span>
                </div>
                <div className="body-for-you">
                    <div className="home-page-custom row-cols-md-6 ">
                        <div className="container">
                            {/* <img src={`data:image/jpeg;base64,${item?.userId?.image}`} /> */}
                            <img src={imageHomePagedoctor} alt="prop" className="custom-image-home" />
                            <span className="name-text">tên</span>
                        </div>
                    </div>
                    <div className="home-page-custom row-cols-md-6 ">
                        <div className="container">
                            {/* <img src={`data:image/jpeg;base64,${item?.userId?.image}`} /> */}
                            <img src={imageHomePagedoctor} alt="prop" className="custom-image-home" />
                            <span className="name-text">tên</span>
                        </div>
                    </div>
                    <div className="home-page-custom row-cols-md-6 ">
                        <div className="container">
                            {/* <img src={`data:image/jpeg;base64,${item?.userId?.image}`} /> */}
                            <img src={imageHomePagedoctor} alt="prop" className="custom-image-home" />
                            <span className="name-text">tên</span>
                        </div>
                    </div>
                    <div className="home-page-custom row-cols-md-6 ">
                        <div className="container">
                            {/* <img src={`data:image/jpeg;base64,${item?.userId?.image}`} /> */}
                            <img src={imageHomePagedoctor} alt="prop" className="custom-image-home" />
                            <span className="name-text">tên</span>
                        </div>
                    </div>
                </div>
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
                <div className="body-specialty row row-cols-md-4 g-4">
                    {specialtyList &&
                        specialtyList.length > 0 &&
                        specialtyList.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="card custom-card-home-page"
                                    onClick={() =>
                                        navigate(`/dich-vu-y-te/kham-chuyen-khoa/danh-sach-bac-si/${item.id}`)
                                    }
                                >
                                    <img src={`data:image/jpeg;base64,${item?.image}`} className="card-img-top" />
                                    <div className="card-body">
                                        <span className="card-text">{item.specialtyName}</span>
                                    </div>
                                </div>
                            );
                        })}
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
                <div className="body-good-doctor row-cols-md-6">
                    {doctorList &&
                        doctorList.length > 0 &&
                        doctorList.map((item, index) => {
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
                                    <img src={`data:image/jpeg;base64,${item?.image}`} className="custom-image-home" />
                                    <span className="name-text">{item?.fullName}</span>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="homepage-content-service">
                <div className="header-service">
                    <span className="header-div">Dịch vụ toàn diện</span>
                </div>
                <div className="body-service"></div>
                <span className="test">4</span>
            </div>
        </div>
    );
};

export default HomePage;
