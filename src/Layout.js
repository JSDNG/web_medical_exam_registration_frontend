import App from "./App";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Management/Admin/Admin";
import Doctor from "./components/Management/Doctor/Doctor";
import Staff from "./components/Management/Staff/Staff";
import Patient from "./components/Patient/Patient";
import HomePage from "./components/Home/HomePage";
import DashBoard from "./components/Management/Admin/Content/DashBoard";
import ManageUser from "./components/Management/Admin/Content/ManageUser";

import Appointment from "./components/Patient/Content/Appointment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";



const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/dich-vu-y-te/kham-chuyen-khoa" element={<Appointment />}>
                        <Route path="sets" element={<Appointment />} />
                        
                    </Route>
                    <Route path="/benh-nhan" element={<Patient />}>
                        <Route path="sets" element={<Appointment />} />
                        
                    </Route>
                </Route>
                <Route path="/quan-tri-vien" element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                </Route>
                <Route path="/bac-si" element={<Doctor />}>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                </Route>
                <Route path="/nhan-vien" element={<Staff />}>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-user" element={<ManageUser />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default Layout;
