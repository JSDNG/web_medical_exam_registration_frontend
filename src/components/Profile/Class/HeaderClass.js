import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate, useParams, useLocation } from "react-router-dom";
const HeaderClass = (props) => {
    const params = useParams();
    const location = useLocation();
    const id = params.id;
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to={`/classes/${id}`} className="nav-link">
                        Các học phần
                    </NavLink>
                    <NavLink to={`/classes/${id}/members`} className="nav-link">
                        Thành viên
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderClass;
