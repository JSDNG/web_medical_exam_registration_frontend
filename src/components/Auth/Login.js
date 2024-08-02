import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackOutline } from "react-icons/io5";
import "./Login.scss";
import logo from "../../assets/image/logo.png";
import { useNavigate } from "react-router-dom";
import { postLoginWithLocal } from "../../services/apiService";
import { toast } from "react-toastify";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
    const handleKeyDown = (event) => {
        if (event && event.key === "Enter") {
            handleLogin();
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    useEffect(() => {
        if (isAuthenticated === true && account.role === "Bệnh nhân") {
            navigate("/");
        } else if (isAuthenticated === true && account.role === "Nhân viên") {
            navigate("/quan-ly/nhan-vien");
        } else if (isAuthenticated === true && account.role === "Bác sĩ") {
            navigate("/quan-ly/bac-si");
        } else if (isAuthenticated === true && account.role === "Quản trị viên") {
            navigate("/quan-ly/quan-tri-vien");
        }
    }, [navigate]);
    const handleLogin = async () => {
        //validate
        const inValidEmail = validateEmail(email);

        if (!inValidEmail) {
            toast.error("Vui lòng nhập email hợp lệ !");
            return;
        }

        if (!password) {
            toast.error("Vui lòng nhập mật khẩu !");
            return;
        }
        if (password.length < 6) {
            toast.error("Vui lòng nhập mật khẩu tối thiểu 6 ký tự !");
            return;
        }
        //api
        let res = await postLoginWithLocal({ email, password });
        if (res && res.EC === 0) {
            dispatch(doLogin(res));
            toast.success(res.EM);
            if (res.DT.role === "Bác sĩ") {
                navigate("/quan-ly/bac-si");
            } else if (res.DT.role === "Bệnh nhân") {
                navigate("/");
            } else if (res.DT.role === "Quản trị viên") {
                navigate("/quan-ly/quan-tri-vien");
            } else if (res.DT.role === "Nhân viên") {
                navigate("/quan-ly/nhan-vien");
            }
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM);
        }
    };
    const handleGoogleLogin = async () => {
        window.location.href = "/api/v1/auth/google";
    };

    return (
        <div className="root-login">
            <div className="login-container-custom">
                <div className="login-body">
                    <div className="header-custom-login">
                        <img src={logo} className="image" alt="" />
                        <div>
                            <span className="hospital-header-login">Phòng khám tư nhân</span>
                            <span className="name-hospital-header-login"> HealthBooking</span>
                        </div>
                    </div>

                    <div className="login-content">
                        <div>
                            <label className="form-label">Email(*)</label>
                            <input
                                type={"email"}
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="abc1@gmail.com"
                            />
                        </div>
                        <div className="password-custom">
                            <label className="form-label">Mật khẩu(*)</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                name="password"
                                autoComplete="off"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                            {showPassword ? (
                                <span className="icons-eye" onClick={() => setShowPassword(false)}>
                                    <VscEye />
                                </span>
                            ) : (
                                <span className="icons-eye" onClick={() => setShowPassword(true)}>
                                    <VscEyeClosed />
                                </span>
                            )}
                        </div>

                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    handleLogin();
                                }}
                            >
                                <span>Đăng nhập</span>
                            </button>
                        </div>
                        <div className="custom-login-with-google">
                            <button className="btn btn-light" onClick={() => handleGoogleLogin()}>
                                <FcGoogle className="mx-2" />
                                Tiếp tục với Google
                            </button>
                        </div>
                    </div>
                    <div className="action-choose">
                        <div className="forgot-password">
                            <span>Quên mật khẩu?</span>
                        </div>
                        <div className="btn-register-custom">
                            <span
                                onClick={() => {
                                    navigate("/dang-ky");
                                }}
                            >
                                Đăng ký
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
