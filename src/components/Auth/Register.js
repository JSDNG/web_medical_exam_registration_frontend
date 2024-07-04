import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackOutline } from "react-icons/io5";
import "./Register.scss";

import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
const Register = () => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        //validate

        const inValidEmail = validateEmail(email);

        if (!inValidEmail) {
            toast.error("invalid email");
            return;
        }

        if (!password) {
            toast.error("invalid password");
            return;
        }

        if (!fullName) {
            toast.error("invalid fullName");
            return;
        }
        //api
        let res = await postRegister({ email, password, accountType: "Patient", fullName, roleId: 3 });

        if (res && +res.EC === 0) {
            toast.success(res.EM);
            navigate("/login");
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
                <button className="btn btn-light col-2" disabled>
                    Đăng ký
                </button>
                <button
                    className="btn btn-light "
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Đăng nhập
                </button>
            </div>
            <div className="register-container col-4">
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
                <div>
                    <label className="form-label">Tên đầy đủ(*)</label>
                    <input
                        type={"text"}
                        className="form-control"
                        name="fullName"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
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
                            handleRegister();
                        }}
                    >
                        Đăng ký
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

export default Register;
