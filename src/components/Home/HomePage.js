import imageHomePage from "../../assets/image/image_home.png";
import imageHomePagedoctor from "../../assets/image/image_doctor.jpg";
import imageHomePageSpecialty from "../../assets/image/image_specialty.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./HomePage.scss";
const HomePage = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);

    const navigate = useNavigate();
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
                </div>
                <div className="body-specialty row row-cols-md-4 g-4">
                    <div className="card custom-card-home-page ">
                        <img src={imageHomePageSpecialty} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <span className="card-text">Tên</span>
                        </div>
                    </div>
                    <div className="card custom-card-home-page ">
                        <img src={imageHomePageSpecialty} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <span className="card-text">Tên</span>
                        </div>
                    </div>
                    <div className="card custom-card-home-page ">
                        <img src={imageHomePageSpecialty} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <span className="card-text">Tên</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="homepage-content-good-doctor">
                <div className="header-good-doctor">
                    <span className="header-div">Bác sĩ nổi bật</span>
                </div>
                <div className="body-good-doctor"></div>
                <span className="test">3</span>
            </div> */}
            <div className="homepage-content-for-you">
                <div className="header-for-you">
                    <span className="header-div">Bác sĩ nổi bật</span>
                </div>
                <div className="body-for-you">
                    <div className="home-page-custom row-cols-md-6 ">
                        <div className="container" onClick={() => navigate("/dich-vu-y-te/kham-chuyen-khoa")}>
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
