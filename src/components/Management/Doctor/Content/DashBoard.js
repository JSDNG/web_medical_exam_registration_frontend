import { useNavigate } from "react-router-dom";
const DashBoard = (props) => {
    const navigate = useNavigate();
    return (
        <div className="container-dash-board-admin">
            <div className="row " style={{ width: "50rem", height: "20rem" }}>
                <div className="col-md-6">
                    <div className="card h-50 text-center">
                        <div className="card-body">
                            <h5 className="card-title">Số lượng ca làm việc </h5>
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
                    <div className="card h-50 text-center">
                        <div className="card-body">
                            <h5 className="card-title">Số lượng bệnh nhân</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <button className="btn btn-primary">Go somewhere</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{ width: "50rem" }}>
                <div className="col-md-6">
                    <div className="card text-center">
                        <div className="card-body">
                            <h5 className="card-title"> Số lượng lịch khám</h5>
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
                {/* <div className="col-sm-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">
                                With supporting text below as a natural lead-in to additional content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default DashBoard;
