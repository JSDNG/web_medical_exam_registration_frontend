import imageHomePage from "../../assets/image/imageHomepage.avif";
import { useNavigate } from "react-router-dom";
import GetSet from "./GetDataforHome/GetSet";
import GetClass from "./GetDataforHome/GetClass";
const HomePage1 = (props) => {
    const navigate = useNavigate();
    return (
        <div className="main-container">
            <div className="main-content">
                <div>
                    <GetSet />
                </div>

                <div>
                    <GetClass />
                </div>
                <div>
                    <span className="title">Hãy thử các tính năng cập nhật mới</span>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <div className="card">
                                <img src={imageHomePage} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={imageHomePage} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={imageHomePage} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a longer card with supporting text.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage1;
