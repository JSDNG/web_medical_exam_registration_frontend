import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import { useState } from "react";
const Header = (props) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const account = useSelector((state) => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        let res = await logout(account.email, account.refresh_token);
        //console.log(res);
        if (res && res.EC === 0) {
            //clear redux
            dispatch(doLogout());
            toast.success(res.EM);
            navigate("/");
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {isAuthenticated === false ? (
                    <NavLink to="/" className="navbar-brand header-custom">
                        Quizlet
                    </NavLink>
                ) : (
                    <NavLink to="/home" className="navbar-brand header-custom">
                        Quizlet
                    </NavLink>
                )}

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isAuthenticated === false ? (
                            <>
                                <NavLink to="/" className="nav-link">
                                    Trang chủ
                                </NavLink>
                                <NavDropdown title="Sản phẩm" id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        Test 1
                                    </NavDropdown.Item>

                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        Test 2
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        Test 3
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <NavLink to="/home" className="nav-link">
                                    Trang chủ
                                </NavLink>
                                <NavDropdown title="Thư viện của bạn" id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/profile/sets");
                                        }}
                                    >
                                        Học phần
                                    </NavDropdown.Item>

                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/profile/folders");
                                        }}
                                    >
                                        Thư mục
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/profile/classes");
                                        }}
                                    >
                                        Lớp học
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <NavLink to="/admin" className="nav-link">
                                    Admin
                                </NavLink>
                                <NavLink to="/user" className="nav-link">
                                    User
                                </NavLink>
                            </>
                        )}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                    </Form>
                    <Nav className="set-2">
                        {isAuthenticated === false ? (
                            <>
                                <button
                                    className="btn btn-light"
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    Đăng nhập
                                </button>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => {
                                        navigate("/register");
                                    }}
                                >
                                    Đăng ký
                                </button>
                            </>
                        ) : (
                            <>
                                <NavDropdown title="Thêm" id="basic-nav-dropdown">
                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/create-set");
                                        }}
                                    >
                                        Học phần
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/create-set");
                                        }}
                                    >
                                        Thư mục
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/create-set");
                                        }}
                                    >
                                        Lớp học
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown
                                    title={
                                        <img
                                            src={`data:image/png;base64, ${account.image}`}
                                            alt="Cài đặt chung"
                                            style={{ width: "30px", height: "30px" }}
                                        />
                                    }
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item> {account.username}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => {
                                            navigate("/profile");
                                        }}
                                    >
                                        Hồ sơ
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>Ngôn ngữ</NavDropdown.Item>
                                    <NavDropdown.Item>Cài đặt</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => {
                                            handleLogOut();
                                        }}
                                    >
                                        Đăng xuất
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
