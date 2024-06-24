import App from "./App";
import { Route, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import DashBoard from "./components/Admin/Content/DashBoard";
import ManageUser from "./components/Admin/Content/ManageUser";

import Profile from "./components/Profile/Profile";
import ListClass from "./components/Profile/Class/ListClass";
import ManageDetailClass from "./components/Profile/Class/ManageDetailClass";
import SetFromClass from "./components/Profile/Class/SetFromClass";
import Members from "./components/Profile/Class/Members";
import ListSet from "./components/Profile/Set/ListSet";
import DetailSet from "./components/Profile/Set/DetailSet";

import ListFolder from "./components/Profile/Folder/ListFolder";
import DetailFolder from "./components/Profile/Folder/DetailFolder";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HomePage1 from "./components/Home/HomePage1";
import CreateSet from "./components/Profile/Set/CreateSet";
import EditSet from "./components/Profile/Set/EditSet";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="user" element={<ListQuiz />} />
                    <Route path="/flash-cards/:id" element={<DetailSet />} />
                    <Route path="home" element={<HomePage1 />} />
                    <Route path="/profile" element={<Profile />}>
                        <Route path="sets" element={<ListSet />} />
                        <Route path="folders" element={<ListFolder />} />
                        <Route path="classes" element={<ListClass />} />
                    </Route>
                    <Route path="/classes/:id" element={<ManageDetailClass />}>
                        <Route index element={<SetFromClass />} />
                        <Route path="members" element={<Members />} />
                    </Route>
                    <Route path="/folders/:id" element={<DetailFolder />} />
                    <Route path="/create-set" element={<CreateSet />} />
                    <Route path="/edit-set/:id" element={<EditSet />} />
                </Route>

                <Route path="/quiz/:id" element={<DetailQuiz />} />
                <Route path="/admin" element={<Admin />}>
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
