import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
const HeaderProfile = (props) => {
    const params = useParams();
    const location = useLocation();
    const id = params.id;
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to="/ho-so" className="nav-link">
                        Thông tin cá nhân
                    </NavLink>
                    <NavLink to="/ho-so/benh-an-ban-than" className="nav-link">
                        Bệnh án đã khám của bản thân
                    </NavLink>
                    <NavLink to="/ho-so/benh-an-nguoi-than" className="nav-link">
                        Bệnh án đã khám của người thân
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderProfile;
