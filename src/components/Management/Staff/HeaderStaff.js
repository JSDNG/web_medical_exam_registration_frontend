import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
const HeaderStaff = (props) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to="/quan-ly/nhan-vien" className="nav-link">
                        Lịch hẹn chờ xác nhận
                    </NavLink>
                    <NavLink to="/quan-ly/nhan-vien/danh-sach" className="nav-link">
                        Lịch hẹn đã xác nhận
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderStaff;
