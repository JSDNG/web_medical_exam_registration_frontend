import { useNavigate } from "react-router-dom";
const DashBoard = (props) => {
    const navigate = useNavigate();
    return (
        <div className="container-dash-board-admin">
            <div className="dash-board-admin-custom">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"> Số lượng bác sĩ</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-bac-si")}
                            >
                                Go somewhere
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"> Số lượng nhân viên</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-nhan-vien")}
                            >
                                Go somewhere
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dash-board-admin-custom">
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"> Số lượng bệnh án</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-benh-nhan")}
                            >
                                Go somewhere
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"> Số lượng chuyên khoa</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/quan-ly/bac-si/quan-ly-chuyen-khoa")}
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
