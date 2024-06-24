import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const HeaderProfile = (props) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavLink to="/profile/sets" className="nav-link">
                        Học phần
                    </NavLink>
                    <NavLink to="/profile/folders" className="nav-link">
                        Thư mục
                    </NavLink>
                    <NavLink to="/profile/classes" className="nav-link">
                        Lớp
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default HeaderProfile;
