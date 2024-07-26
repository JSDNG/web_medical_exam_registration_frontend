import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
const HeaderAppointmentHistory = (props) => {
    const params = useParams();
    const location = useLocation();
    const id = params.id;
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to="/lich-hen" className="nav-link">
                        Lịch hẹn cá nhân
                    </NavLink>
                    <NavLink to="/lich-hen/nguoi-than" className="nav-link">
                        Lịch hẹn người thân
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderAppointmentHistory;
