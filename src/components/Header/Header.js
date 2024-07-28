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
import logo from "../../assets/image/logo.png";
import ModalQuickCheckUp from "./ModalQuickCheckUp";
import { IoSettings } from "react-icons/io5";
const Header = (props) => {
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showQuickCheckUp, setShowQuickCheckUp] = useState(false);
    const handleLogOut = async () => {
        let res = await logout(account.email, account.refresh_token);
        //console.log(res);
        if (res && res.EC === 0) {
            //clear redux
            dispatch(doLogout());
            toast.success(res.EM);
            navigate("/login");
        } else {
            toast.error(res.EM);
        }
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary body-header-custom">
            <Container>
                <img src={logo} className="custom-icon-header" />
                <NavLink to="/" className="navbar-brand header-custom">
                    HealthBooking
                </NavLink>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse">
                    <Nav className="me-auto1 ">
                        <NavLink to="/" className="nav-link">
                            Tất cả
                        </NavLink>
                        <NavLink to="/" className="nav-link">
                            Tại viện
                        </NavLink>
                        <NavLink to="/" className="nav-link">
                            Sống khỏe
                        </NavLink>
                        <Form className="custom-search">
                            <Form.Control type="search" placeholder="Tìm kiếm" className="me-2" aria-label="Search" />
                        </Form>
                    </Nav>
                    <Nav className="me-auto2">
                        <NavLink to="/lich-hen" className="nav-link">
                            Lịch hẹn
                        </NavLink>
                        <div onClick={() => setShowQuickCheckUp(true)} className="nav-link quick-check-up-custom">
                            Khám ngay
                        </div>
                        <ModalQuickCheckUp
                            showQuickCheckUp={showQuickCheckUp}
                            setShowQuickCheckUp={setShowQuickCheckUp}
                        />

                        <NavDropdown title={<IoSettings style={{ fontSize: "28px" }} />} id="basic-nav-dropdown">
                            <NavDropdown.Item
                                onClick={() => {
                                    navigate("/ho-so");
                                }}
                            >
                                {" "}
                                {account?.user?.fullName}
                            </NavDropdown.Item>
                            <NavDropdown.Divider />

                            <NavDropdown.Item
                                onClick={() => {
                                    handleLogOut();
                                }}
                            >
                                Đăng xuất
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
