import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import "./HeaderManagement.scss";

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
            navigate("/login");
        } else {
            toast.error(res.EM);
        }
    };

    // Hàm render NavDropdown dựa trên vai trò của người dùng
    const renderNavDropdown = () => {
        if (account?.role === "Quản trị viên") {
            return (
                <>
                    <NavDropdown title="Người dùng" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-bac-si")}>
                            Bác sĩ
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-nhan-vien")}>
                            Nhân viên
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-benh-nhan")}>
                            Bệnh nhân
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Khác" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-chuyen-khoa")}>
                            Quản lý chuyên khoa
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/quan-ly/quan-tri-vien/quan-ly-thuoc")}>
                            Quản lý thuốc
                        </NavDropdown.Item>
                    </NavDropdown>
                </>
            );
        } else if (account?.role === "Bác sĩ") {
            return (
                <NavDropdown title="Phòng khám" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => navigate("/quan-ly/bac-si/quan-ly-lich-lam-viec")}>
                        Lịch làm việc
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/quan-ly/bac-si/quan-ly-kham-benh")}>
                        Khám bệnh
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate("/quan-ly/bac-si/danh-sach-benh-an-da-kham")}>
                        Bệnh án đã khám
                    </NavDropdown.Item>
                </NavDropdown>
            );
        }
        // Nếu không phù hợp với bất kỳ vai trò nào, trả về null để không render gì cả
        return null;
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary body-header-manage-custom">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse-manage">
                    <Nav className="me-auto">{renderNavDropdown()}</Nav>
                    <Nav className="ms-auto custom-header-mamage">
                        <Nav
                            className="nav-link nav-link-custom"
                            onClick={() => navigate("/quan-ly/thong-tin-ca-nhan")}
                        >
                            {account?.user?.fullName}
                        </Nav>
                        <NavDropdown title={"Cài đặt"} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={handleLogOut}>Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
