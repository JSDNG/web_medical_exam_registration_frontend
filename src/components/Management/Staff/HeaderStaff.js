import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
const HeaderStaff = (props) => {
    const params = useParams();
    const location = useLocation();
    const id = params.id;
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to="/quan-ly/nhan-vien" className="nav-link">
                        Danh sách lịch hẹn chờ xác nhận
                    </NavLink>
                    <NavLink to="/quan-ly/nhan-vien/m" className="nav-link">
                        Danh sách lịch hẹn đã xác nhận
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderStaff;
