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
import ModalQuickCheckUp from "./ModalQuickCheckUp";
import { IoSettings } from "react-icons/io5";
import { GiAlarmClock } from "react-icons/gi";
import { TbBrandBooking } from "react-icons/tb";
import { GiWingfoot } from "react-icons/gi";
import { CgLogIn } from "react-icons/cg";

const Header = (props) => {
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showQuickCheckUp, setShowQuickCheckUp] = useState(false);
    const [search, setSearch] = useState("");
    const handleKeyDown = (event) => {
        if (event && event.key === "Enter") {
            navigate(`/tim-kiem/${search}`);
        }
    };
    const handleLogOut = async () => {
        let res = await logout(account.email, account.refresh_token);
        //console.log(res);
        if (res && res.EC === 0) {
            //clear redux
            dispatch(doLogout());
            toast.success(res.EM);
            navigate("/dang-nhap");
        } else {
            toast.error(res.EM);
        }
    };
    const handleQuickCheckUp = () => {
        if (isAuthenticated === false) {
            navigate("/dang-nhap");
        } else {
            setShowQuickCheckUp(true);
        }
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary body-header-custom">
            <Container>
                <Navbar.Collapse id="basic-navbar-nav" className="custom-collapse">
                    <Nav className="me-auto-header">
                        <GiWingfoot className="custom-icon-header" style={{ fontSize: "43px", color: "#2bc740" }} />
                        <NavLink to="/" className="navbar-brand header-custom">
                            HealthBooking
                        </NavLink>
                    </Nav>
                    <Nav className="me-auto-center ">
                        <NavLink to="/" className="nav-link">
                            Tất cả
                        </NavLink>
                        <NavLink to="/song-khoe" className="nav-link">
                            Sống khỏe
                        </NavLink>
                        <Form className="custom-search" onSubmit={(event) => event.preventDefault()}>
                            <Form.Control
                                type="search"
                                placeholder="Tìm kiếm bác sĩ"
                                className="me-2"
                                aria-label="Search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                        </Form>
                    </Nav>
                    <Nav className="me-auto-end">
                        <NavLink to="/lich-hen" className="nav-link d-flex flex-column align-items-center">
                            <GiAlarmClock style={{ fontSize: "35px", marginBottom: "-5px" }} />
                            <span style={{ fontSize: "15px" }}>Lịch hẹn</span>
                        </NavLink>

                        <div
                            onClick={() => handleQuickCheckUp()}
                            className="nav-link quick-check-up-custom d-flex flex-column align-items-center"
                        >
                            <TbBrandBooking style={{ fontSize: "35px", marginBottom: "-5px" }} />
                            <span style={{ fontSize: "15px" }}>Khám ngay</span>
                        </div>

                        <ModalQuickCheckUp
                            showQuickCheckUp={showQuickCheckUp}
                            setShowQuickCheckUp={setShowQuickCheckUp}
                        />
                        {isAuthenticated ? (
                            <NavDropdown
                                title={
                                    <span className="d-flex flex-column align-items-center">
                                        <IoSettings style={{ fontSize: "30px", marginBottom: "-1px" }} />
                                        <span style={{ fontSize: "15px", marginBottom: "-4px" }}>Cài đặt</span>
                                    </span>
                                }
                                style={{ marginRight: "-5px" }}
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item
                                    onClick={() => {
                                        navigate("/ho-so");
                                    }}
                                >
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
                        ) : (
                            <div
                                onClick={() => navigate("/dang-nhap")}
                                className="nav-link quick-check-up-custom d-flex flex-column align-items-center"
                            >
                                <CgLogIn style={{ fontSize: "35px", marginBottom: "-5px" }} />
                                <span style={{ fontSize: "15px" }}>Đăng nhập</span>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
