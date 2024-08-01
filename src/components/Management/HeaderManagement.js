import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import "./HeaderManagement.scss";
import { AiFillSchedule } from "react-icons/ai";
import { FaFileMedical } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegListAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdMedication } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
const Header = (props) => {
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        let res = await logout(account.email, account.refresh_token);
        console.log(res);
        if (res && res.EC === 0) {
            dispatch(doLogout());
            toast.success(res.EM);
            navigate("/dang-nhap");
        } else {
            toast.error(res.EM);
        }
    };
    // Hàm render NavDropdown dựa trên vai trò của người dùng
    const renderNavDropdown = () => {
        if (account?.role === "Quản trị viên") {
            return (
                <>
                    <Nav.Link
                        onClick={() => navigate("/quan-ly/quan-tri-vien")}
                        style={{ color: "white" }}
                        className="d-flex align-items-center"
                    >
                        <IoArrowBackOutline style={{ fontSize: "30px" }} />
                    </Nav.Link>
                    <NavDropdown
                        title={
                            <span style={{ color: "white" }} className="d-flex align-items-center">
                                {" "}
                                <IoIosPeople style={{ color: "white", fontSize: "38px" }} />
                                Nhân viên y tế
                            </span>
                        }
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-bac-si")}>
                            Bác sĩ
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-nhan-vien")}>
                            Nhân viên
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-chuyen-khoa")}
                            style={{ color: "white" }}
                            className="d-flex align-items-center gap-1 mt-1"
                        >
                            <FaRegListAlt style={{ fontSize: "30px" }} />
                            Chuyên khoa
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-thuoc")}
                            style={{ color: "white" }}
                            className="d-flex align-items-center mt-1"
                        >
                            <MdMedication style={{ fontSize: "30px" }} />
                            Thuốc
                        </Nav.Link>
                    </Nav.Item>
                </>
            );
        } else if (account?.role === "Bác sĩ") {
            return (
                <>
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => navigate("/quan-ly/bac-si")}
                            style={{ color: "white" }}
                            className="d-flex align-items-center"
                        >
                            <IoArrowBackOutline style={{ fontSize: "30px" }} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => navigate("/quan-ly/bac-si/quan-ly-lich-lam-viec")}
                            style={{ color: "white" }}
                            className="d-flex align-items-center"
                        >
                            <AiFillSchedule style={{ fontSize: "30px" }} />
                            Lịch làm việc
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => navigate("/quan-ly/bac-si/quan-ly-kham-benh")}
                            style={{ color: "white" }}
                            className="d-flex align-items-center"
                        >
                            <FaFileMedical style={{ fontSize: "27px" }} />
                            Khám bệnh
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => navigate("/quan-ly/bac-si/danh-sach-benh-an-da-kham")}
                            style={{ color: "white" }}
                            className="d-flex align-items-center gap-1"
                        >
                            <FaRegListAlt style={{ fontSize: "30px" }} />
                            Bệnh án đã khám
                        </Nav.Link>
                    </Nav.Item>
                </>
            );
        }
        // Nếu không phù hợp với bất kỳ vai trò nào, trả về null để không render gì cả
        return null;
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary body-header-manage-custom">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse-manage" style={{ color: "white" }}>
                    <Nav className="me-auto">{renderNavDropdown()}</Nav>
                    {account?.role === "Nhân viên" ? (
                        <span className="d-flex gap-5 justify-content-center">Phòng khám tư nhân HealthBooking</span>
                    ) : (
                        <></>
                    )}

                    <Nav className="ms-auto custom-header-mamage">
                        <Nav
                            className="nav-link nav-link-custom"
                            onClick={() => navigate("/quan-ly/thong-tin-ca-nhan")}
                            style={{ color: "white" }}
                        >
                            {account?.user?.fullName}
                        </Nav>
                        <NavDropdown
                            title={<IoSettingsOutline style={{ color: "white", fontSize: "35px" }} />}
                            id="basic-nav-dropdown"
                            style={{ color: "white" }}
                        >
                            <NavDropdown.Item onClick={handleLogOut}>Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
