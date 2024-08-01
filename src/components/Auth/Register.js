import React, { useState, useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import "./Register.scss";
import logo from "../../assets/image/logo.png";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
const Register = () => {
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
    const account = useSelector((state) => state?.user?.account);
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
    const handleRegister = async () => {
        //validate

        const inValidEmail = validateEmail(email);

        if (!inValidEmail) {
            toast.error("Vui lòng nhập email hợp lệ !");
            return;
        }
        if (!fullName) {
            toast.error("Vui lòng nhập họ và tên !");
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
        let res = await postRegister({ email, password, accountType: "Patient", fullName, roleId: 4 });

        if (res && +res.EC === 0) {
            toast.success(res.EM);
            navigate("/dang-nhap");
        }
        if (res && +res.EC !== 0) {
            toast.error(res.EM);
        }
    };

    return (
        <div className="root-register">
            <div className="register-container-custom">
                <div className="register-body">
                    <div className="back-login">
                        <IoArrowBackOutline
                            onClick={() => {
                                navigate("/dang-nhap");
                            }}
                        />
                    </div>
                    <div className="header-custom-register">
                        <img src={logo} className="image" alt="" />
                        <div>
                            <span className="hospital-header-register">Phòng khám tư nhân</span>
                            <span className="name-hospital-header-register"> HealthBooking</span>
                        </div>
                    </div>
                    <div className="register-content">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
