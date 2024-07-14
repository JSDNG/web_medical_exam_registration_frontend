import { useNavigate } from "react-router-dom";
const DashBoard = (props) => {
    const navigate = useNavigate();
    return (
        <div className="container-dash-board-doctor">
            <div className="dash-board-doctor-custom">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"> Số lượng ngày làm việc</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/quan-ly/bac-si/quan-ly-lich-lam-viec")}
                            >
                                Go somewhere
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"> Số lượng ca làm việc</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/quan-ly/bac-si/quan-ly-kham-benh")}
                            >
                                Go somewhere
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dash-board-doctor-custom">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"> Số lượng bệnh án đã khám</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/quan-ly/bac-si/quan-ly-kham-benh")}
                            >
                                Go somewhere
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"> Số lượng bệnh án chưa khám</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/quan-ly/bac-si/quan-ly-kham-benh")}
                            >
                                Go somewhere
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
