import "./Management.scss";
import Header from "./HeaderManagement";
import { Outlet } from "react-router-dom";
const Management = () => {
    return (
        <div className="management-container">
            <div className="management-header-container">
                <Header />
            </div>
            <div className="management-body-container">
                <div className="management-sidenav-container"></div>
                <div className="management-main">
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
