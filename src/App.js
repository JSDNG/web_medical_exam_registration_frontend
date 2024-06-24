import "./App.scss";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
const App = () => {
    return (
        <div className="app-container">
            <div className="app-header-container">
                <Header />
            </div>
            <div className="app-main-container">
                <div className="app-sidenav-container"></div>
                <div className="app-content">
                    <Outlet />
                </div>
            </div>
            <div className="app-footer-container">
                <Footer />
            </div>
        </div>
    );
};
export default App;
