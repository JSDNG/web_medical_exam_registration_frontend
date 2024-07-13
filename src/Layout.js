import App from "./App";
import { Route, Routes } from "react-router-dom";

import Management from "./components/Management/Management";
import DasboardManagement from "./components/Management/DashBoard";
import Admin from "./components/Management/Admin/Admin";
import DashBoardAdmin from "./components/Management/Admin/Content/DashBoard";
import ManageUser from "./components/Management/Admin/Content/ManageUser";

import Doctor from "./components/Management/Doctor/Doctor";
import DashBoardDoctor from "./components/Management/Doctor/Content/DashBoard";
import ManageSchedule from "./components/Management/Doctor/Content/ManageSchedule";
import ManageMedicalAppointment from "./components/Management/Doctor/Content/ManageMedicalAppointment";

import Staff from "./components/Management/Staff/Staff";
import ApproveAppointment from "./components/Management/Staff/ApproveAppointment";
import AppointmentList from "./components/Management/Staff/AppointmentList";

import Profile from "./components/Patient/Profile/Profile";
import ManageInformation from "./components/Patient/Profile/ManageInformation";
import ManageMedicalRecord from "./components/Patient/Profile/ManageMedicalRecord";
import ManageAppointmentSchedule from "./components/Patient/Profile/ManageAppointmentSchedule";
import HomePage from "./components/Home/HomePage";
import SpecialistExamination from "./components/Patient/Content/SpecialistExamination";
import SpecialtyDetail from "./components/Patient/Content/SpecialtyDetail";
import Appointment from "./components/Patient/Content/Appointment";
import DoctorList from "./components/Patient/Content/DoctorList";
import MedicalStaffRecord from "./components/Management/MedicalStaffRecord";
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
                    <Route path="/dich-vu-y-te/kham-chuyen-khoa" element={<SpecialistExamination />} />
                    <Route path="/dich-vu-y-te/kham-chuyen-khoa/detail/:id" element={<SpecialtyDetail />} />
                    <Route path="/dich-vu-y-te/kham-chuyen-khoa/:id" element={<Appointment />} />
                    <Route path="/danh-sach/bac-si/noi-bat" element={<DoctorList />}>
                        <Route path="sets" element={<Appointment />} />
                    </Route>
                    <Route path="/ho-so" element={<Profile />}>
                        <Route index element={<ManageInformation />} />
                        <Route path="benh-an" element={<ManageMedicalRecord />} />
                        <Route path="lich-hen" element={<ManageAppointmentSchedule />} />
                    </Route>
                </Route>
                <Route path="/quan-ly" element={<Management />}>
                    <Route path="/quan-ly/quan-tri-vien" element={<Admin />}>
                        <Route index element={<DashBoardAdmin />} />
                        <Route path="manage-user" element={<ManageUser />} />
                    </Route>
                    <Route path="/quan-ly/bac-si" element={<Doctor />}>
                        <Route index element={<DashBoardDoctor />} />
                        <Route path="quan-ly-lich-lam-viec" element={<ManageSchedule />} />
                        <Route path="quan-ly-kham-benh" element={<ManageMedicalAppointment />} />
                        <Route path="quan-ly-thong-tin-ca-nhan" element={<MedicalStaffRecord />} />
                    </Route>
                    <Route path="/quan-ly/nhan-vien" element={<Staff />}>
                        <Route index element={<ApproveAppointment />} />
                        <Route path="m" element={<AppointmentList />} />
                    </Route>
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
