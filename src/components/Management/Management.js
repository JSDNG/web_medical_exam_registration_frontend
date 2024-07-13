import "./Management.scss";
import Header from "./HeaderManagement";
import { Outlet } from "react-router-dom";
const Management = () => {
    return (
        <div className="Management-container">
            <div className="Management-header-container">
                <Header />
            </div>
            <div className="Management-body-container">
                <div className="Management-sidenav-container"></div>
                <div className="Management-main">
                    <Outlet />
                </div>
            </div>
            {/* <div className="Management-footer-container">
                <Footer />
            </div> */}
        </div>
    );
};
export default Management;
