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
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [group, setGroup] = useState("");
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

        if (!username) {
            toast.error("invalid username");
            return;
        }
        if (!group) {
            toast.error("invalid group");
            return;
        }
        //api
        let res = await postRegister(email, password, username, group);

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
                    Register
                </button>
                <button
                    className="btn btn-light col-2"
                    onClick={() => {
                        navigate("/login");
                    }}
                >
                    Log in
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
                    <label className="form-label">UserName(*)</label>
                    <input
                        type={"text"}
                        className="form-control"
                        name="username"
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div className="password-custom">
                    <label className="form-label">Password(*)</label>
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
                    <label className="form-label">Group</label>
                    <select className="form-select" onChange={(event) => setGroup(event.target.value)} value={group}>
                        <option value="1">TEACHER</option>
                        <option value="2">STUDENT</option>
                    </select>
                </div>
                <div>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            handleRegister();
                        }}
                    >
                        Register
                    </button>
                </div>

                <div>
                    <br />
                </div>

                <div>
                    <button className="btn btn-light">
                        <FcGoogle className="mx-2" />
                        Continue with Google
                    </button>
                </div>
                <div>
                    <button className="btn btn-light">
                        <FaFacebook className="mx-2" />
                        Continue with Facebook
                    </button>
                </div>
            </div>
        </>
    );
};

export default Register;
