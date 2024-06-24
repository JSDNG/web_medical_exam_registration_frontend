import imageHomePage from "../../assets/image/imageHomepage.avif";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);

    const navigate = useNavigate();
    return (
        <div className="homepage-container">
            <>
                <div>
                    <img src={imageHomePage} alt="prop" />
                </div>
                <div className="homepage-content">
                    <div className="titlea">Thẻ ghi nhớ kỹ thuật số và các công cụ học tốt nhất</div>
                    <div className="titleb">
                        Tham gia cùng hơn 60 triệu học sinh đang sử dụng các thẻ ghi nhớ dựa trên nền tảng khoa học, các
                        bài kiểm tra thử và lời giải chuyên gia của Quizlet để cải thiện điểm số và đạt được mục tiêu.
                    </div>
                    <div className="titlec">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            Đăng ký miễn phí
                        </button>
                    </div>
                </div>
            </>
        </div>
    );
};

export default HomePage;
