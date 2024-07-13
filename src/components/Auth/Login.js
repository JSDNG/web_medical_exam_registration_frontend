import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackOutline } from "react-icons/io5";
import "./Login.scss";

import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleLogin = async () => {
        //validate
        const inValidEmail = validateEmail(email);

        if (!inValidEmail) {
            toast.error("Vui lòng nhập email");
            return;
        }

        if (!password) {
            toast.error("Vui lòng nhập mật khẩu");
            return;
        }

        //api
        let res = await postLogin({ email, password });
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

    return (
        <>
            <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="image"
                alt=""
            />
            <div className="back">
                <IoArrowBackOutline
                    onClick={() => {
                        navigate("/");
                    }}
                />
            </div>
            <div className="action-choose">
                <button
                    className="btn btn-light col-2"
                    onClick={() => {
                        navigate("/register");
                    }}
                >
                    Đăng ký
                </button>
                <button className="btn btn-light" disabled>
                    Đăng nhập
                </button>
            </div>
            <div className="login-container col-4">
                <div>
                    <label className="form-label">Email(*)</label>
                    <input
                        type={"email"}
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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
                <div className="forgot-password">
                    <span>Quên mật khẩu?</span>
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

                <div>
                    <br />
                </div>

                <div>
                    <button className="btn btn-light">
                        <FcGoogle className="mx-2" />
                        Tiếp tục với Google
                    </button>
                </div>
                <div>
                    <button className="btn btn-light">
                        <FaFacebook className="mx-2" />
                        Tiếp tục với Facebook
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
