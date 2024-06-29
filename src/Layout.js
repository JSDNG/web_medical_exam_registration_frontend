import App from "./App";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Management/Admin/Admin";
import DashBoardAdmin from "./components/Management/Admin/Content/DashBoard";
import ManageUser from "./components/Management/Admin/Content/ManageUser";

import Doctor from "./components/Management/Doctor/Doctor";
import DashBoardDoctor from "./components/Management/Doctor/Content/DashBoard";
import ManageSchedule from "./components/Management/Doctor/Content/ManageSchedule";
import ManageMedicalRecords from "./components/Management/Doctor/Content/ManageMedicalRecords";

import Staff from "./components/Management/Staff/Staff";
import Patient from "./components/Patient/Patient";
import HomePage from "./components/Home/HomePage";

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
                    <Route index element={<DashBoardAdmin />} />
                    <Route path="manage-user" element={<ManageUser />} />
                </Route>
                <Route path="/bac-si" element={<Doctor />}>
                    <Route index element={<DashBoardDoctor />} />
                    <Route path="quan-ly-lich-lam-viec" element={<ManageSchedule />} />
                    <Route path="quan-ly-kham-benh" element={<ManageMedicalRecords />} />
                </Route>
                <Route path="/nhan-vien" element={<Staff />}>
                    <Route index element={<DashBoardAdmin />} />
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
