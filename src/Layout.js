import App from "./App";
import { Route, Routes } from "react-router-dom";

import Management from "./components/Management/Management";
import Admin from "./components/Management/Admin/Admin";
import DashBoardAdmin from "./components/Management/Admin/Content/DashBoard";
import ManageDoctor from "./components/Management/Admin/Content/ManageDoctor";

import Doctor from "./components/Management/Doctor/Doctor";
import DashBoardDoctor from "./components/Management/Doctor/Content/DashBoard";
import ManageSchedule from "./components/Management/Doctor/Content/ManageSchedule";
import ManageMedicalAppointment from "./components/Management/Doctor/Content/ManageMedicalAppointment";

import Staff from "./components/Management/Staff/Staff";
import ApproveAppointment from "./components/Management/Staff/ApproveAppointment";
import AppointmentList from "./components/Management/Staff/AppointmentList";

import Profile from "./components/Patient/Profile/Profile";
import ManageInformation from "./components/Patient/Profile/ManageInformation";
import MedicalRecordPatient from "./components/Patient/Profile/MedicalRecordPatient";
import MedicalRecordRelative from "./components/Patient/Profile/MedicalRecordRelative";

import AppointmentHistory from "./components/Patient/AppointmentHistory/AppointmentHistory";
import AppointmentListPatient from "./components/Patient/AppointmentHistory/AppointmentListPatient";
import AppointmentListRelative from "./components/Patient/AppointmentHistory/AppointmentListRelative";

import HomePage from "./components/Home/HomePage";
import SpecialistExamination from "./components/Patient/Content/SpecialistExamination";
import AllDoctorfromOneSpecialty from "./components/Patient/Content/AllDoctorfromOneSpecialty";
import Appointment from "./components/Patient/Content/Appointment";
import ProminentDoctorList from "./components/Patient/Content/ProminentDoctorList";
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
                    <Route
                        path="/dich-vu-y-te/kham-chuyen-khoa/danh-sach-bac-si/:id"
                        element={<AllDoctorfromOneSpecialty />}
                    />

                    <Route path="/danh-sach/bac-si/noi-bat" element={<ProminentDoctorList />} />
                    <Route path="/dich-vu-y-te/kham-chuyen-khoa/bac-si/:id" element={<Appointment />} />

                    <Route path="/lich-hen" element={<AppointmentHistory />}>
                        <Route index element={<AppointmentListPatient />} />
                        <Route path="nguoi-than" element={<AppointmentListRelative />} />
                    </Route>

                    <Route path="/ho-so" element={<Profile />}>
                        <Route index element={<ManageInformation />} />
                        <Route path="benh-an-ban-than" element={<MedicalRecordPatient />} />
                        <Route path="benh-an-nguoi-than" element={<MedicalRecordRelative />} />
                    </Route>
                </Route>
                <Route path="/quan-ly" element={<Management />}>
                    <Route path="/quan-ly/thong-tin-ca-nhan" element={<MedicalStaffRecord />} />
                    <Route path="/quan-ly/quan-tri-vien" element={<Admin />}>
                        <Route index element={<DashBoardAdmin />} />
                        <Route path="quan-ly-bac-si" element={<ManageDoctor />} />
                    </Route>

                    <Route path="/quan-ly/bac-si" element={<Doctor />}>
                        <Route index element={<DashBoardDoctor />} />
                        <Route path="quan-ly-lich-lam-viec" element={<ManageSchedule />} />
                        <Route path="quan-ly-kham-benh" element={<ManageMedicalAppointment />} />
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
