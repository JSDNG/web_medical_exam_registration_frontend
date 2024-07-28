const Forbidden = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">403</h1>
                <p className="fs-3">
                    {" "}
                    <span className="text-danger">Bạn không có quyền truy cập.</span>
                </p>
            </div>
        </div>
    );
};
export default Forbidden;
