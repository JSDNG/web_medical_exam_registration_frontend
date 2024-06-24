import React from "react";
import { MDBFooter, MDBContainer, MDBCol, MDBRow, MDBIcon, MDBBtn } from "mdb-react-ui-kit";

const Footer = () => {
    return (
        <MDBFooter className="text-center text-white" style={{ backgroundColor: "#0a4275" }}>
            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © 2024 Copyright:
                <a className="text-white" href="https://mdbootstrap.com/">
                    MDBootstrap.com
                </a>
            </div>
        </MDBFooter>
    );
};

export default Footer;
